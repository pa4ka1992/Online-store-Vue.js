import {
  useStringSearchFilter,
  useNumberSearchFilter,
  getMockValueByKey,
  IProduct,
  TProductKeys,
  TStringFields,
  TNumberFields,
  IFilter,
} from '@/services';
import { useQueryParam } from './query-param';
import { useProductsStore } from '@/store';
import { isString, isNumber, isNumberArray, isStringArray } from '@/utils';
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue';

export function useSearch(keys: TProductKeys[]) {
  const searchParamKey = 'search';
  const { param } = useQueryParam(searchParamKey);

  const productStore = useProductsStore();

  const { filters } = storeToRefs(productStore);

  const searchField = ref('');

  function startSearch() {
    if (searchField.value === '') param.value = null;
    else param.value = [searchField.value];
  }

  function syncWithQuery() {
    const value = param.value;
    if ((isStringArray(value) || isNumberArray(value)) && value[0]) {
      const filterArray = keys.reduce((acc: IFilter[], key: TProductKeys) => {
        const mockValue = getMockValueByKey(key);
        if (isString(mockValue) && value[0])
          acc.push(useStringSearchFilter(key as keyof TStringFields, value[0].toString()));
        else if (isNumber(mockValue) && isNumber(value[0]))
          acc.push(useNumberSearchFilter(key as keyof TNumberFields, value[0]));
        return acc;
      }, []);

      if (isNumber(value[0])) searchField.value = value[0].toString();
      else searchField.value = value[0];

      filters.value.set(searchParamKey, (product: IProduct) =>
        filterArray.reduce((acc, filter) => acc || filter(product), false),
      );      
    } else {
      filters.value.set(searchParamKey, () => true);
      searchField.value = '';
    }
  }

  syncWithQuery();

  watch(param, () => {
    syncWithQuery();
  });

  return { searchField, startSearch }
}
