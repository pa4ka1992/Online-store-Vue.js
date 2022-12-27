import { defineStore } from 'pinia';
import { ref, type Ref, computed } from 'vue';

import { IFilter, ISort, IProduct, ProductRepository, useStringSort, TProductKeys, TValuesCount } from '@/services';

export const useProductsStore = defineStore('products', () => {
  const _products: Ref<IProduct[]> = ref([]);
  const repo = ProductRepository.getInstance();
  const _productMap: Ref<{ [key: string]: IProduct }> = ref({});

  async function fetchData() {
    _products.value = await repo.fetchProducts();
    _products.value.forEach((item) => (_productMap.value[item.id] = item));
  }

  fetchData();

  const products = computed(() => {
    return _products.value
      .filter((product) => {
        return filters.value.reduce((acc, item) => acc && item(product), true);
      })
      .sort(sortType.value);
  });

  function getProductById(id: string) {
    return _productMap.value[id];
  }

  function getValuesCount<Key extends TProductKeys>(key: Key): TValuesCount<Key> {
    const result = new Map<IProduct[Key], { count: number, total: number }>();
    for (const product of _products.value) {
      const value = result.get(product[key]);
      if (!value) result.set(product[key], {count: 0, total: 1} );
      else value.total++;
    }

    for (const product of products.value) {
      const value = result.get(product[key]);
      value ? value.count++ : null;
    }
    return result;
  };

  const filters: Ref<IFilter[]> = ref([]);
  const sortType: Ref<ISort> = ref(useStringSort('title'));

  return {
    products,
    filters,
    sortType,
    fetchData,
    getProductById,
    getValuesCount
  };
});
