import { IFilter } from '../model/filter';
import { IProduct } from '../model/product';

type Strings = {
  [Key in keyof IProduct as IProduct[Key] extends string ? Key : never]: number;
}; 

export function useSearchFilter<Key extends keyof Strings>(key: Key, searchStr: string): IFilter {
  return function(product: IProduct) {
    return product[key].includes(searchStr);
  }
}