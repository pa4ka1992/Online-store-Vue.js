import { defineStore, storeToRefs } from 'pinia';
import { useCartStore } from './CartStore';
import { ref, computed, watch } from 'vue';
import { ICartProduct } from '@/services//model/product';

export const usePaginationStore = defineStore('paginationStore', () => {
  const { cart } = storeToRefs(useCartStore())
  const page = ref(1);
  const limit = ref(10);
  const maxLimit = 10;

  const totalPage = computed((): number => {
    if (!limit.value) return 1;
    const cartLength: number = cart.value.length;
    if (!cart.value || Number.isNaN(cartLength) || Number.isNaN(limit.value) || limit.value <= 0) {
      return 1;
    }
    const pages: number = Math.ceil(cartLength / limit.value);
    return pages > 1 ? pages : 1;
  });

  const pageProducts = computed((): ICartProduct[] => {
    return cart.value.slice(limit.value * (page.value - 1), limit.value * page.value);
  });
 
  watch(totalPage, () => {
    page.value = 1;
  });

  return {
    pageProducts,
    page,
    totalPage,
    limit,
    maxLimit,
  };
});
