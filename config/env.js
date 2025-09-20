import devConfig from './envs/dev.js';
import prodConfig from './envs/prod.js';
import testConfig from './envs/test.js';
import { merge } from 'lodash-es';

const nodeEnv = process.env.NODE_ENV || 'development';
const appEnv = process.env.APP_ENV || nodeEnv;

const defaultConfig = {
  appEnv,
  nodeEnv,
  PORT: 3000,
  authTokenS2sUrl: 'http://localhost:4001',
  cache_redis: {
    port: 6379,
    db: 0,
    clusterMode: false,
    tls: null,
  },
};

let envConfig = {};

if (defaultConfig.appEnv === 'production') {
  envConfig = prodConfig;
} else if (defaultConfig.appEnv === 'test') { // unit test env
  envConfig = testConfig;
} else {
  envConfig = devConfig;
}

const appConfig = merge(defaultConfig, envConfig);

export default appConfig;
