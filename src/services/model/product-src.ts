import { IProduct } from './product';

export interface IProductSource {
  fetchProducts(): Promise<IProduct[]>;
}
