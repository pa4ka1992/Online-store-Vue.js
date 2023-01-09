import { IProduct } from './model';
import { getDiscountedProduct } from './discount';
import { IProductSource } from './model/product-src';

const apiUrl = 'https://dummyjson.com/products?limit=100';

const ignoreIds = [24, 21, 22, 20, 29, 10, 1, 23, 89, 77, 56, 70, 66]

export class DummyApi implements IProductSource {
  fetchProducts(): Promise<IProduct[]> {
    return fetch(apiUrl, { method: 'GET' })
      .then((data) => data.json())
      .then((item) => {
        return item.products.filter((product: IProduct) => !ignoreIds.includes(product.id))
                            .map((product: IProduct) => getDiscountedProduct(product));
      });
  }
}
