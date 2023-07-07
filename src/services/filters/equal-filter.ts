import { IFilter } from '../model/filter';
import { IProduct } from '../model/product';

export function useEqualFilter<Key extends keyof IProduct>(key: Key, item: IProduct[Key]): IFilter {
  return function (product: IProduct) {
    return item === product[key];
  };
}
