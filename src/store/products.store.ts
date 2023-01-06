import { defineStore } from 'pinia';
import { ref, type Ref, computed } from 'vue';

import {
  type IProduct,
  ProductSourceApi,
} from '@/services';

export const useProducts = defineStore('products', () => {
  const _products: Ref<IProduct[]> = ref([]);
  const repo = ProductSourceApi.getInstance();
  const _productMap: Ref<{ [key: string]: IProduct }> = ref({});
  const loaded = ref(false);

  async function fetchData() {
    _products.value = await repo.fetchProducts();
    _products.value.forEach((item) => (_productMap.value[item.id] = item));
    loaded.value = true;
  }

  fetchData();

  const products = computed(() => {
    return [..._products.value];
  });

  function getProductById(id: IProduct['id']) {
    return _productMap.value[id];
  }

  return {
    products,
    loaded,
    fetchData,
    getProductById,
  };
});
