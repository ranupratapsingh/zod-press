import * as z from 'zod';
import ExpectedError from '../errors/expected_error.ts';
import LogFactory from '../log_factory.ts';
import express from 'express';

interface JsonApiError {
  status: number,
  code?: string,
  detail: string,
  title: string,
  source?: {
    pointer?: string,
    parameter?: string,
    header?: string,
  }
  meta?: unknown,
}

const defaultError: JsonApiError = {
  status: 500,
  detail: 'Internal Server Error',
  title: 'Internal Server Error',
};

/**
 * middleware function to handle the general errors.
 * @param {Object} _req
 * @param {Object} res the response object
 * @param {Function} next
 */
async function exceptionHandler(err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) {
  let message = err.message;
  let errorTitle: string = defaultError.title;
  let statusCode: number = defaultError.status;
  let errList = [];
  if (err instanceof ExpectedError) {
    statusCode = err.statusCode;
    errorTitle = err.title;
    LogFactory.getLogger().warn(err.message);
  } else if (err instanceof z.ZodError) {
    statusCode = 422;
    message = 'payload validation error';
    errList = zodErrToJSONAPI(err);
  } else {
    LogFactory.getLogger().error(err);
  }

  const errorInfo = defaultError;
  const errorStatus = String(statusCode);
  const errorDetail = err.message || errorInfo.detail;
  const errors = errList.length > 0 ? errList : [{
    status: errorStatus,
    title: errorTitle,
    detail: errorDetail
  }];

  res.status(statusCode).send({
    message,
    errors,
  });
  next();
}

function zodErrToJSONAPI(err: z.ZodError): JsonApiError[] {
  const errors: JsonApiError[] = err.issues.map((issue) => {
    return {
      status: 422,
      code: issue.code,
      detail: issue.message,
      source: {
        pointer: '/' + issue.path.join('/'),
      }
    } as JsonApiError;
  });

  return errors;
}

export default exceptionHandler;
