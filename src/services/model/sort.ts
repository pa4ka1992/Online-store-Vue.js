import { IProduct } from './product';
import { TProductKeys } from './types';

export interface ISort {
  readonly key: TProductKeys;
  readonly sortType: SortType;
  cmpFunc: (first: IProduct, second: IProduct) => number;
}

export enum SortType {
  descending = 'desc',
  ascending = 'asc',
}