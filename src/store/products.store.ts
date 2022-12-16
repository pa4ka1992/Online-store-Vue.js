import { defineStore } from 'pinia';
import { ref, type Ref, computed } from 'vue';

import { Filter } from './interfaces/filter';
import { IProduct } from './interfaces/product';
import { ProductRepository } from '@/services/product.repository';


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
    return _products.value.filter((product) => {
      return filters.value.reduce((acc, item) => acc && item(product), true);
    });
  });

  function getProductById(id: string) {
    return _productMap.value[id];
  }

  const filters: Ref<Filter[]> = ref([]);

  return {
    products,
    getProductById
  };
});
