import { IProduct, TStringFields, ISort, SortType } from '../model';

function strCmp(first: string, second: string) {
  return first.localeCompare(second, 'en');
}

export function useStringSort<Key extends keyof TStringFields>(key: Key, descending = false): ISort {
  if (descending)
    return {
      key: key,
      sortType: SortType.descending,
      cmpFunc: function (first: IProduct, second: IProduct) {
        return strCmp(second[key], first[key]);
      },
    }
  else
    return {
      key: key,
      sortType: SortType.ascending,
      cmpFunc: function (first: IProduct, second: IProduct) {
        return strCmp(first[key], second[key]);
      },
    };
}