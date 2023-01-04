import { defineStore, storeToRefs } from 'pinia';
import { useCartStore } from './CartStore';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { ICartProduct } from './types';
import router from '@/router';
import { LocalStorageApi } from '@/services/local-storage';

export const usePaginationStore = defineStore('paginationStore', () => {
  const { cart } = storeToRefs(useCartStore());
  const _LS = LocalStorageApi.getInstance();
  const page = ref(1);
  const limit = ref(10);
  const maxLimit = [1, 2, 3, 4, 5, 10, 25, 50, 100];

  const totalPage = computed((): number => {
    if (!limit.value) return 1;
    const cartLength: number = cart.value.length;
    if (!cart.value || Number.isNaN(cartLength) || Number.isNaN(limit.value) || limit.value <= 0) {
      return 1;
    }
    const pages: number = Math.ceil(cartLength / limit.value);
    return pages > 1 ? pages : 1;
  });

  const startIndex = computed((): number => {
    return limit.value * (page.value - 1) + 1;
  });

  const pageProducts = computed((): ICartProduct[] => {
    return cart.value.slice(limit.value * (page.value - 1), limit.value * page.value);
  });

  const updateLimit = (value: number): void => {
    limit.value = value;
  };

  watch([page, limit, totalPage], ([newPage, newLimit, newTotalPage]) => {
    if (page.value > newTotalPage) page.value = newTotalPage;

    _LS.setProperty('cart-page', newPage);
    _LS.setProperty('cart-limit', newLimit);
    router.replace({ name: 'cart', query: { limit: `${limit.value}`, page: `${page.value}` } });
  });

  onBeforeMount(() => {
    const limitLS = _LS.getProperty('cart-limit');
    const pageLS = _LS.getProperty('cart-page');

    if (typeof limitLS === 'number') limit.value = limitLS;
    if (typeof pageLS === 'number') page.value = pageLS;
  });

  return {
    pageProducts,
    page,
    totalPage,
    limit,
    maxLimit,
    startIndex,
    updateLimit,
  };
});
