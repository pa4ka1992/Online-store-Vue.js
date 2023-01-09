import { IFilter } from '../model/filter';
import { IProduct } from '../model/product';
import { TStringFields, TNumberFields } from '../model';

export function useNumberSearchFilter<Key extends keyof TNumberFields>(key: Key, searchNum: number): IFilter {
  return function(product: IProduct) {
    return product[key].toFixed(2).includes(searchNum.toFixed(2));
  }
}

export function useStringSearchFilter<Key extends keyof TStringFields>(key: Key, searchStr: string): IFilter {
  return function (product: IProduct) {
    return product[key].toLowerCase().includes(searchStr.toLowerCase());
  };
}