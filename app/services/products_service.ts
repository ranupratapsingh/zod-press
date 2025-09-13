import type { Product } from '../dtos/product.dto.ts';
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
}

export default ProductsService;
