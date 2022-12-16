import { IProduct } from './model/product';

export interface IProductSource {
  fetchProducts(): Promise<IProduct[]>;
}