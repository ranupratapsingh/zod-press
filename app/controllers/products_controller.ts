import type { AppRequest } from '../../lib/extensions/app_http_messages.ts';
import ProductSerializer from '../serializers/product_serializer.ts';
import ProductsService from '../services/products_service.ts';
import express from 'express';

class ProductsController {
  async index(req: AppRequest, res: express.Response) {
    const service = new ProductsService(req.tokenInfo?.sub);
    const products = await service.listAll();
    const result = ProductSerializer.serialize(products);
    res.send(result);
  }
}

export default new ProductsController();
