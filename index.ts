import LogFactory from './lib/log_factory.ts';
import attachRequestContext from './lib/middlewares/attach-request-context.js';
import config from './config/env.js';
import exceptionHandler from './lib/middlewares/exception_handler.ts';
import express from 'express';
import router from './config/router.ts';
import setSessionInfo from './lib/middlewares/set_session_info.ts';

const app = express();
app.use(attachRequestContext);
app.use(setSessionInfo);
app.use('/zod-press/v1/', router);
// error handling
app.use(exceptionHandler);

app.listen(config.PORT, () => {
  LogFactory.getLogger().info(`Listening on port ${config.PORT}...`);
});
