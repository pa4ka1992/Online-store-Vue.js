import { IProduct } from './model/product';
import { IProductSource } from './model/product-src';

const apiUrl = 'https://dummyjson.com/products?limit=100';

export class DummyApi implements IProductSource {
  fetchProducts(): Promise<IProduct[]> {
    return fetch(apiUrl, { method: 'GET' })
            .then((data) => data.json())
            .then((item) => item.products)
  }
}