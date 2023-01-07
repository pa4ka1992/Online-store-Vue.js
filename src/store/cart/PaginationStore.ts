import { defineStore, storeToRefs } from 'pinia';
import { useCartStore } from './CartStore';
import { ref, Ref, computed, watch, onBeforeMount } from 'vue';
import { ICartProduct } from './types';
import { LocalStorageApi } from '@/services/local-storage';
import { CartDefaultVal, LSKey } from './constants';
import { useQueryCart } from '@/composables/query-cart';

export const usePaginationStore = defineStore('paginationStore', () => {
  const { cart } = storeToRefs(useCartStore());
  const _LS = LocalStorageApi.getInstance();
  const page: Ref<number> = ref(CartDefaultVal.page);
  const limit: Ref<number> = ref(CartDefaultVal.limit);

  const totalPage = computed((): number => {
    if (!limit.value) return CartDefaultVal.page;
    const cartLength: number = cart.value.length;
    if (!cart.value || Number.isNaN(cartLength) || Number.isNaN(limit.value) || limit.value <= 0) {
      return CartDefaultVal.page;
    }
    const pages: number = Math.ceil(cartLength / limit.value);
    return pages > CartDefaultVal.page ? pages : CartDefaultVal.page;
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

    _LS.setProperty(LSKey.page, newPage);
    _LS.setProperty(LSKey.limit, newLimit);
    useQueryCart(limit.value, page.value);
  });

  onBeforeMount(() => {
    const limitLS: unknown = _LS.getProperty(LSKey.limit);
    const pageLS: unknown = _LS.getProperty(LSKey.page);

    if (typeof limitLS === 'number' && limitLS !== limit.value) {
      limit.value = limitLS;
    }
    if (typeof pageLS === 'number' && pageLS !== page.value) {
      page.value = pageLS;
    }
  });

  return {
    pageProducts,
    page,
    totalPage,
    limit,
    startIndex,
    updateLimit,
  };
});
