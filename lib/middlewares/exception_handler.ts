import ExpectedError from '../errors/expected_error.ts';
import LogFactory from '../log_factory.ts';
import express from 'express';

const defaultError = {
  status: 500,
  message: 'Internal Server Error',
  title: 'Internal Server Error',
};

/**
 * middleware function to handle the general errors.
 * @param {Object} req
 * @param {Object} res the response object
 * @param {Function} next
 */
async function exceptionHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  const message = err.message;
  let errorTitle:string = defaultError.title;
  let statusCode:number = defaultError.status;
  if(err instanceof ExpectedError){
    statusCode = err.statusCode;
    errorTitle = err.title;
    LogFactory.getLogger().warn(err.message);
  } else {
    LogFactory.getLogger().error(err);
  }

  const errorInfo = defaultError;
  const errorStatus = String(statusCode);
  const errorDetail = err.message || errorInfo.message;

  res.status(statusCode).send({
    message,
    errors: [{
      status: errorStatus,
      title: errorTitle,
      detail: errorDetail
    }]
  });
  next();
}

export default exceptionHandler;
