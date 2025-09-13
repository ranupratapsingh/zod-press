import express from 'express';

class PingController {
  async ping(_req: express.Request, res: express.Response) {
    res.send({ message: 'Pong!' });
  }
}

export default new PingController();
