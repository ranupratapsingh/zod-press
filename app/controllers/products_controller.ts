import type { AppRequest } from '../../lib/extensions/app_http_messages.ts';
import ProductSerializer from '../serializers/product_serializer.ts';
import ProductsService from '../services/products_service.ts';
import express from 'express';
import redisClient from '../../config/redis.js';

class ProductsController {
  async index(req: AppRequest, res: express.Response) {
    const service = new ProductsService(req.tokenInfo?.sub);
    const cacheKey = 'products:serialized';

    // Check if products are cached
    const cachedResult = await redisClient.get(cacheKey);
    if (cachedResult) {
      return res.send(JSON.parse(cachedResult));
    }

    const products = await service.listAll();
    const result = ProductSerializer.serialize(products);
    await redisClient.set(cacheKey, JSON.stringify(result));
    res.send(result);
  }
}

export default new ProductsController();
