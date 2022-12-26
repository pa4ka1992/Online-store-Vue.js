import { IProduct } from './product';

export interface ISort {
  (first: IProduct, second: IProduct): number;
}
