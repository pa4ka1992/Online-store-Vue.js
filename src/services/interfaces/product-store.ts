import { IProduct } from './product';
import { Filter } from './filter';
import { Observable } from '@/common/observable';

export interface IProductStore {
  products: Observable<IProduct[]>;
  applyFilter(filters: Filter[]): void;
  getProductById(id: IProduct['id']): IProduct;
}