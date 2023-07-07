import { IProduct } from '../model/product';
import { IFilter } from '../model/filter';
import { TNumberFields } from '../model';

export type TRangeBounds = {
  lower? : number, 
  upper?: number
};

export function useRangeFilter<Key extends keyof TNumberFields>(key: Key, range: TRangeBounds): IFilter {
  return function (product: IProduct) {
    if (range.upper && product[key] > range.upper) return false;
    if (range.lower && product[key] < range.lower) return false;
    return true;
  };
}
