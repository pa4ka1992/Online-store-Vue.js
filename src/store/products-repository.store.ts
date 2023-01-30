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

  const { products, isLoaded } = storeToRefs(useProducts());

  // Common
  // ==========================

  const isLoading = ref(!isLoaded.value);

  const loaderWatch = watch(isLoaded, () => {
    if (isLoaded.value) {
      updateAll();
      // Updates only once, so we dont need it
      loaderWatch();
    }
  });

  async function updateAll() {
    if (isLoaded.value) {
      isLoading.value = true;
      productsFiltered.value = await sort(await filter(products.value));
      isLoading.value = false;
    }
  }

  // Sort
  // ==========================

  const defaultSort = useStringSort('title');

  const sortType: Ref<ISort | null> = ref(null);

  const _sortType = computed(() => {
    return sortType.value ?? defaultSort;
  });

  watch(sortType, async () => {
    if (isLoaded.value) {
      isLoading.value = true;
      productsFiltered.value = await sort(productsFiltered.value);
      isLoading.value = false;
    }
  });

  function sort(items: IProduct[]): Promise<IProduct[]> {
    return new Promise((resolve) => {
      resolve(items.slice().sort(_sortType.value.cmpFunc));
    });
  }

  // Filter
  // ==========================

  const filters: Ref<Map<string, IFilter[] | IFilter>> = ref(new Map());

  watch(filters, async () => updateAll(), { deep: true });

  const productsFiltered: Ref<IProduct[]> = ref([]);

  async function filter(items: IProduct[]): Promise<IProduct[]> {
    return new Promise((resolve) => {
      resolve(
        items.filter((product) => {
          let result = true;
          for (const value of filters.value) {
            result = Array.isArray(value[1])
              ? value[1].reduce((acc, item) => acc && item(product), result)
              : value[1](product);
            if (!result) return false;
          }
          return result;
        }),
      );
    });
  }

  // Values count
  // ==========================

  function countValues<Key extends TProductKeys>(key: Key, map: TValuesCountMap<Key>) {
    map.forEach((value) => (value.count = 0));
    for (const product of productsFiltered.value) {
      const value = map.get(product[key]);
      value ? value.count++ : null;
    }
    return map;
  }

  function createValuesCountMap<Key extends TProductKeys>(key: Key): TValuesCountMap<Key> {
    const result = new Map<IProduct[Key], TValuesCount>();
    for (const product of products.value) {
      const value = result.get(product[key]);
      if (!value) {
        result.set(product[key], { count: 0, total: 1 });
      } else {
        value.total++;
      }
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
