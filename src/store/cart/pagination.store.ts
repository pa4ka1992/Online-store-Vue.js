import { defineStore, storeToRefs } from 'pinia';
import { useCart } from './cart.store';
import { ref, Ref, computed, watch } from 'vue';
import { ICartItem } from './_types';
import { LocalStorageApi } from '@/services/local-storage';
import { CartDefaultVal, LSKey } from './_constants';
import { useQueryCart } from '@/composables/query-cart';

export const usePagination = defineStore('pagination', () => {
  const { cart } = storeToRefs(useCart());
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

  const pageProducts = computed((): ICartItem[] => {
    return cart.value.slice(limit.value * (page.value - 1), limit.value * page.value);
  });

  watch([page, limit, totalPage], ([newPage, newLimit, newTotalPage]) => {
    if (page.value > newTotalPage) page.value = newTotalPage;

    _LS.setProperty(LSKey.page, newPage);
    _LS.setProperty(LSKey.limit, newLimit);
    useQueryCart(limit.value, page.value);
  });

  (function initStore() {
    const limitLS: unknown = _LS.getProperty(LSKey.limit);
    const pageLS: unknown = _LS.getProperty(LSKey.page);

    if (typeof limitLS === 'number' && limitLS !== limit.value) {
      limit.value = limitLS;
    }
    if (typeof pageLS === 'number' && pageLS !== page.value) {
      page.value = pageLS;
    }
  })();

  return {
    pageProducts,
    page,
    totalPage,
    limit,
    startIndex,
  };
});
