import { IProduct } from '../model/product';
import { IFilter } from '../model/filter';
import { TNumberFields } from '../model';

export function useRangeFilter<Key extends keyof TNumberFields>(key: Key, upper?: number, lower?: number): IFilter {
  return function(product: IProduct) {
    if (upper !== undefined && product[key] > upper) return false;
    if (lower !== undefined && product[key] < lower) return false;
    return true;
  }
}
