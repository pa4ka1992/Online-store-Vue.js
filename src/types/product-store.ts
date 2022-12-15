import { Product } from './product';
import { Filter } from './filter';
import { Observable } from '@/common/observable';

export interface ProductStore {
  products: Observable<Product[]>;
  applyFilter(filters: Filter[]): void;
  getProductById(id: Product['id']): Product;
}