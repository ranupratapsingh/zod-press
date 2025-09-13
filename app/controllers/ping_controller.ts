import { Request, Response } from 'express';

class PingController {
  async ping(_req: Request, res: Response) {
    res.send({ message: 'Pong!' });
  }
}

export default new PingController();
