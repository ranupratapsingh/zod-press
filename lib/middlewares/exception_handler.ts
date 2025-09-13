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
  let message = err.message;
  console.error(err);

  const errorInfo = defaultError;
  const errorStatus = String(errorInfo.status);
  const errorDetail = err.message || errorInfo.message;
  const errorTitle = errorInfo.title;

  res.status(errorInfo.status).send({
    message,
    errors: [{
      status: errorStatus,
      title: errorTitle,
      detail: errorDetail
    }]
  });
}

export default exceptionHandler;
