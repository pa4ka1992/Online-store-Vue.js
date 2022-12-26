import { IProduct, TStringFields, ISort } from '../model';

function strCmp(first: string, second: string) {
  return first.localeCompare(second, 'en');
}

export function useStringSort<Key extends keyof TStringFields>(key: Key, descending = false): ISort {
  if (descending)
    return function (first: IProduct, second: IProduct) {
      return strCmp(first[key], second[key]);
    };
  else
    return function (first: IProduct, second: IProduct) {
      return strCmp(second[key], first[key]);
    };
}