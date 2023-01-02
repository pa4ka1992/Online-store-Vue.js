import { IProduct } from './model/product';

export interface IProductSource {
  fetchProducts(): Promise<IProduct[]>;
}

export interface IProductMap {
  [key: string]: IProduct;
}
