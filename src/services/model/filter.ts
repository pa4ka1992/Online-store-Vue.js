import { IProduct } from './product';

export interface IFilter { 
  (product: IProduct): boolean;
}