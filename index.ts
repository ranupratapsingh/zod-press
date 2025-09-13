import express from 'express';
import config from './config/env.js';
import router from './config/router.ts';
import exceptionHandler from './lib/middlewares/exception_handler.ts';
import LogFactory from './lib/log_factory.ts';

const app = express();
app.use('/zod-press/v1/', router);
// error handling
app.use(exceptionHandler);

app.listen(config.PORT, () => {
  LogFactory.getLogger().info(`Listening on port ${config.PORT}...`);
});
