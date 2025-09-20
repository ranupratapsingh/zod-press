import type { Product } from '../models/product.dto.ts';
import RestClient from '../../lib/rest_client.ts';
import UnexpectedError from '../../lib/errors/unexpected_error.ts';
import config from '../../config/env.js';

class ProductsService {
  userId: string;

  constructor(userId: string = '') {
    this.userId = userId;
  }

  async listAll(): Promise<Product[]> {
    const fullUrl = `${config.fakeDataApi}/products`;
    const { ok, json: products } = await RestClient.get(fullUrl);
    if (!ok) {
      throw new UnexpectedError('Error fetching products');
    }

    return products;
  }

  async getById(productId: string): Promise<Product | null> {
    const fullUrl = `${config.fakeDataApi}/products/${productId}`;
    const { ok, json: product } = await RestClient.get(fullUrl);
    if (!ok) {
      return null;
    }

    return product;
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const fullUrl = `${config.fakeDataApi}/products`;
    const { ok, json: newProduct } = await RestClient.post(fullUrl, productData);
    if (!ok) {
      throw new UnexpectedError('Error creating product');
    }

    return newProduct;
  }
}

export default ProductsService;
