/**
 * nodejs custom loader new way below
 * Ref: https://github.com/nodejs/node/issues/51196
 */
import { pathToFileURL } from 'node:url';
import { register } from 'node:module';
register('@opentelemetry/instrumentation/hook.mjs', pathToFileURL('./'));
// register customer loader ends

/**
 * Need to add following to our run command to make this work correctly:
 * --experimental-loader=@opentelemetry/instrumentation/hook.mjs
 * Above command uses import-in-the-middle/hook.mjs to instrument ESM modules,
 * This is experimental https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/esm-support.md\
 * #instrumentation-hook-required-for-esm
 */
import { ATTR_DEPLOYMENT_ENVIRONMENT_NAME } from '@opentelemetry/semantic-conventions/incubating';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: 'zod-press',
  [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: process.env.APP_ENV || process.env.NODE_ENV || 'development',
});

const traceExporter = new ConsoleSpanExporter();

const sdk = new NodeSDK({
  resource: resource,
  spanProcessors: [new SimpleSpanProcessor(traceExporter)],
  traceExporter: traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

// Gracefully shutdown the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry terminated'))
    .catch((error) => console.error('Error terminating OpenTelemetry', error))
    .finally(() => process.exit(0));
});

sdk.start();
