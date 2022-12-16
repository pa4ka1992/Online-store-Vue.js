import { defineStore } from 'pinia';
import { ref, type Ref, computed } from 'vue';

import { IProduct } from './interfaces/product';
import { ProductRepository } from '@/services/product.repository';


export const productsStore = defineStore('products', () => {
  const _products: Ref<IProduct[]> = ref([]);
  const repo = ProductRepository.getInstance();

  async function fetchData() {
    _products.value = await repo.fetchProducts();
  }

  fetchData();

  const products = computed(() => {
    return [..._products.value];
  })

  return {
    fetchData,
    products,
  };
});
