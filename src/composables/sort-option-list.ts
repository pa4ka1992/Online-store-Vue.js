import { watchEffect } from 'vue';
import { useProductsStore } from '@/store';
import { storeToRefs } from 'pinia';
import {
  type TProductKeys,
} from '@/services';
import { isStringArray, isString, isSortType } from '@/utils';
import { useQueryParam } from './query-param';

export function useSortOptionList(keys: TProductKeys[]) {
  const queryParamKey = 'sortBy';
  const { param } = useQueryParam(queryParamKey);
  const { sortType } = storeToRefs(useProductsStore());

  watchEffect(() => {
    if (!isStringArray(keys)) throw new TypeError('Product keys cannot be the type other than string!');
    if (
      !(isStringArray(param.value) &&
      isString(param.value[0]) &&
      (keys as string[]).includes(param.value[0]) &&
      isSortType(param.value[1]))
    ) {
      sortType.value = null;
    }
  });

  return queryParamKey;
}
