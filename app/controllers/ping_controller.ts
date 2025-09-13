import express from 'express';
import LogFactory from '../../lib/log_factory';

class PingController {
  async ping(req: express.Request, res: express.Response) {
    LogFactory.getLogger('ping#ping').info(req.headers, "Incoming Headers");
    res.send({ message: 'Pong!' });
  }
}

export default new PingController();
