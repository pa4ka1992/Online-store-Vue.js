import { defineStore } from 'pinia';
import { ref, type Ref, computed, onBeforeMount } from 'vue';

import { IFilter } from '@/services/model/filter';
import { IProduct } from '@/services/model/product';
import { ProductRepository } from '@/services/product.repository';
import { IProductMap } from '@/services/product-source';

export const useProductsStore = defineStore('products', () => {
  const _products: Ref<IProduct[]> = ref([]);
  const repo = ProductRepository.getInstance();
  const _productMap: Ref<IProductMap> = ref({});

  async function fetchData() {
    _products.value = await repo.fetchProducts();
    _products.value.forEach((item) => (_productMap.value[item.id] = item));
  }

  const products = computed(() => {
    return _products.value.filter((product) => {
      return filters.value.reduce((acc, item) => acc && item(product), true);
    });
  });

  function getProductById(id: keyof IProductMap) {
    console.log(_productMap.value);
    return _productMap.value[id];
  }

  const filters: Ref<IFilter[]> = ref([]);

  onBeforeMount(async () => {
    await fetchData();
  });

  return {
    products,
    fetchData,
    getProductById,
  };
});
