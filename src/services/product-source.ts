import { IProduct } from '@/store';

export interface IProductSource {
  fetchProducts(): Promise<IProduct[]>;
}