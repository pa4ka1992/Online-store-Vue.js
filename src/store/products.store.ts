import { defineStore } from 'pinia';
import { ref, type Ref, computed } from 'vue';

import { IFilter, ISort, IProduct, ProductRepository, useStringSort } from '@/services';

export const useProductsStore = defineStore('products', () => {
  const _products: Ref<IProduct[]> = ref([]);
  const repo = ProductRepository.getInstance();
  const _productMap: Ref<{[key: string]: IProduct}> = ref({});

  async function fetchData() {
    _products.value = await repo.fetchProducts();
    _products.value.forEach((item) => _productMap.value[item.id] = item);
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

  const filters: Ref<IFilter[]> = ref([]);
  const sortType: Ref<ISort> = ref(useStringSort('title'));

  return {
    products,
    filters,
    sortType,
    fetchData,
    getProductById
  };
});
