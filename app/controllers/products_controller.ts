import { $Product } from '../dtos/product.dto.ts';
import type { AppRequest } from '../../lib/extensions/app_http_messages.ts';
import ExpectedError from '../../lib/errors/expected_error.ts';
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

  async show(req: AppRequest, res: express.Response) {
    const service = new ProductsService(req.tokenInfo?.sub);
    const productId = req.params.id;
    const product = await service.getById(productId);
    if (!product) {
      throw new ExpectedError('Product not found');
    }
    const result = ProductSerializer.serialize(product);
    res.send(result);
  }

  async create(req: AppRequest, res: express.Response) {
    const service = new ProductsService(req.tokenInfo?.sub);
    const productData = $Product.parse(req.body);
    try {
      const newProduct = await service.create(productData);
      // Invalidate cache
      await redisClient.del('products:serialized');
      const result = ProductSerializer.serialize(newProduct);
      res.status(201).send(result);
    } catch {
      res.status(400).send({ error: 'Invalid product data' });
    }
  }
}

export default new ProductsController();
