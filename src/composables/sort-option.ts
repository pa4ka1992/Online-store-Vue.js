import { ref, computed, type Ref, watch } from 'vue';
import { useProductsRepo } from '@/store';
import { storeToRefs } from 'pinia';
import {
  useStringSort,
  useNumberSort,
  type TProductKeys,
  type TStringFields,
  type TNumberFields,
  getMockValueByKey,
  SortType,
} from '@/services';
import { isStringArray, isString, isNumber, isSortType } from '@/utils';
import { useQueryParam } from './query-param';

export function useSortOption(key: TProductKeys, queryParam: string) {
  const { param } = useQueryParam(queryParam);
  const productStore = useProductsRepo();
  const { sortType } = storeToRefs(productStore);

  const _sortUsage: Ref<SortType | null> = ref(null);

  function syncWithQuery() {
    if (isStringArray(param.value) && param.value[0] === key && isSortType(param.value[1])) {
      const value = getMockValueByKey(key);
      if (isString(value)) {
        sortType.value = useStringSort(key as keyof TStringFields, param.value[1] === SortType.descending);
      } else if (isNumber(value)) {
        sortType.value = useNumberSort(key as keyof TNumberFields, param.value[1] === SortType.descending);
      } else {
        sortType.value = null;
      }
    }
  }

  function syncLocal() {
    if (sortType.value) {
      _sortUsage.value = key === sortType.value.key ? sortType.value.sortType : null;
    } else {
      _sortUsage.value = key === productStore.defaultSort.key ? productStore.defaultSort.sortType : null;
    }
  }

  watch(param, () => {
      syncWithQuery();
    }, { immediate: true },
  );

  watch(sortType, () => {
      syncLocal();
    }, { immediate: true },
  );

  const sortUsage = computed({
    get() {
      return _sortUsage.value;
    },
    set(value: SortType | null) {
      if (value) {
        param.value = [key, value];
      } else {
        param.value = null;
      }
    },
  });

  return {
    sortUsage,
  };
}
