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
import { useProductsRepo } from '@/store';
import { isString, isNumber, isNumberArray, isStringArray } from '@/utils';
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/router';

export const searchParamKey = 'search';

export function useSearch(keys: TProductKeys[]) {
  const { push, currentRoute } = useRouter();
  const { param } = useQueryParam(searchParamKey, true);

  const productStore = useProductsRepo();

  const { filters } = storeToRefs(productStore);

  const searchField = ref('');

  async function startSearch() {
    if (currentRoute.value.name !== RouteNames.productSearch) {
      await push({ name: RouteNames.productSearch });
    }

    param.value = searchField.value === '' ? null : [searchField.value];
  }

  function syncWithQuery() {
    const value = param.value;
    if ((isStringArray(value) || isNumberArray(value)) && value[0]) {
      const filterArray = keys.reduce((acc: IFilter[], key: TProductKeys) => {
        const mockValue = getMockValueByKey(key);
        // We already checked for this, but ts still thinks its not
        if (isString(mockValue) && isString(value[0])) {
          acc.push(useStringSearchFilter(key as keyof TStringFields, value[0]));
        } else if (isNumber(mockValue) && isString(value[0])) {
          acc.push(useNumberSearchFilter(key as keyof TNumberFields, value[0]));
        }
        return acc;
      }, []);

      searchField.value = isNumber(value[0]) ? value[0].toString() : value[0];

      filters.value.set(searchParamKey, (product: IProduct) =>
        filterArray.reduce((acc, filter) => acc || filter(product), false),
      );
    } else {
      filters.value.set(searchParamKey, () => true);
      searchField.value = '';
    }
  }

  syncWithQuery();

  watch(
    param,
    () => {
      syncWithQuery();
    },
    {
      immediate: true,
    },
  );

  return { searchField, startSearch };
}
