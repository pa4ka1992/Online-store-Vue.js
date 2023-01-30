import { IProduct, TNumberFields, ISort, SortType } from '../model';

function numCmp(first: number, second: number) {
  return first - second;
}

export function useNumberSort<Key extends keyof TNumberFields>(key: Key, descending = false): ISort {
  if (descending) {
    return {
      key: key,
      sortType: SortType.descending,
      cmpFunc: function (first: IProduct, second: IProduct) {
        return numCmp(second[key], first[key]);
      },
    };
  } else {
    return {
      key: key,
      sortType: SortType.ascending,
      cmpFunc: function (first: IProduct, second: IProduct) {
        return numCmp(first[key], second[key]);
      },
    };
  }
}
