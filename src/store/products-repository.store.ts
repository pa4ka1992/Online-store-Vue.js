import { defineStore, storeToRefs } from 'pinia';
import { ref, type Ref, computed, watch } from 'vue';

import { useProducts } from './products.store';

import {
  type IFilter,
  type ISort,
  type IProduct,
  useStringSort,
  type TProductKeys,
  type TValuesCount,
  type TValuesCountMap,
} from '@/services';

export const useProductsRepo = defineStore('products-repo', () => {
  // Store def
  // ==========================

  const { products, loaded } = storeToRefs(useProducts());

  // Common
  // ==========================

  const isLoading = ref(!loaded.value);

  const loaderWatch = watch(loaded, () => {
    if (loaded.value) {
      updateAll();
      // Updates only once, so we dont need it
      loaderWatch();
    }
  });

  async function updateAll() {
    isLoading.value = true;
    await filter();
    await sort();
    isLoading.value = false;
  }

  // Sort
  // ==========================

  const defaultSort = useStringSort('title');

  const sortType: Ref<ISort | null> = ref(null);

  const _sortType = computed(() => {
    return sortType.value ?? defaultSort;
  });

  watch(sortType, async () => {
    isLoading.value = true;
    await sort();
    isLoading.value = false;
  });

  function sort(): Promise<void> {
    return new Promise(resolve => {
      productsFiltered.value = productsFiltered.value.slice().sort(_sortType.value.cmpFunc);
      resolve();
    });
  }

  // Filter
  // ==========================

  const filters: Ref<Map<string, IFilter[] | IFilter>> = ref(new Map());

  watch(filters, async () => updateAll(), { deep: true });

  const productsFiltered: Ref<IProduct[]> = ref([]);

  async function filter(): Promise<void> {
    return new Promise((resolve) => {
      productsFiltered.value = products.value.filter((product) => {
        let result = true;
        for (const value of filters.value) {
          result = Array.isArray(value[1])
            ? value[1].reduce((acc, item) => acc && item(product), result)
            : value[1](product);
          if (!result) return false;
        }
        return result;
      });
      resolve();
    });
  }

  // Values count
  // ==========================

  function countValues<Key extends TProductKeys>(key: Key, map: TValuesCountMap<Key>) {
    map.forEach((value) => (value.count = 0));
    for (const product of products.value) {
      const value = map.get(product[key]);
      value ? value.count++ : null;
    }
    return map;
  }

  function createValuesCountMap<Key extends TProductKeys>(key: Key): TValuesCountMap<Key> {
    const result = new Map<IProduct[Key], TValuesCount>();
    for (const product of products.value) {
      const value = result.get(product[key]);
      if (!value) result.set(product[key], { count: 0, total: 1 });
      else value.total++;
    }

    countValues(key, result);
    return result;
  }

  return {
    products,
    filters,
    sortType,
    defaultSort,
    isLoading,
    productsFiltered,
    createValuesCountMap,
    countValues,
  };
});
