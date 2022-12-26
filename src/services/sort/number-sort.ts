import { IProduct, TNumberFields, ISort } from '../model';

function numCmp(first: number, second: number) {
  return first - second;
}

export function useNumberSort<Key extends keyof TNumberFields>(key: Key, descending = false): ISort {
  if (descending)
    return function (first: IProduct, second: IProduct) {
      return numCmp(first[key], second[key]);
    };
  else
    return function (first: IProduct, second: IProduct) {
      return numCmp(second[key], first[key]);
    };
}
