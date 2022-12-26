import { IFilter } from '../model/filter';
import { IProduct } from '../model/product';
import { TStringFields } from '../model';

export function useSearchFilter<Key extends keyof TStringFields>(key: Key, searchStr: string): IFilter {
  return function(product: IProduct) {
    return product[key].includes(searchStr);
  }
}