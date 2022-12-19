import { IProduct } from '../model/product';
import { IFilter } from '../model/filter';

// Get only number fields from IProduct

type Numbers = { 
  [Key in keyof IProduct as IProduct[Key] extends number ? Key: never]: number;
}; 

export function useRangeFilter<Key extends keyof Numbers>(key: Key, upper?: number, lower?: number): IFilter {
  return function(product: IProduct) {
    if (upper !== undefined && product[key] > upper) return false;
    if (lower !== undefined && product[key] < lower) return false;
    return true;
  }
}
