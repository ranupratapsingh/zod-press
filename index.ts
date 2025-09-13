import express from 'express';
import config from './config/env.js';
import router from './config/router.ts';

const app = express();
app.use('/zod-press/v1/', router);

app.get("/", (req, res) => {
  res.send({ "message": "Hello World!" });
});

const port = config.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
