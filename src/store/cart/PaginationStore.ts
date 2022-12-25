import { defineStore, storeToRefs } from 'pinia';
import { useCartStore } from './CartStore';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { ICartProduct } from '@/services/model/types/cart';
import router from '@/router';

export const usePaginationStore = defineStore('paginationStore', () => {
  const { cart } = storeToRefs(useCartStore());
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

  const startIndex = computed((): number => {
    return limit.value * (page.value - 1) + 1;
  });

  const pageProducts = computed((): ICartProduct[] => {
    return cart.value.slice(limit.value * (page.value - 1), limit.value * page.value);
  });

  const addQueries = (): void => {
    router.replace({ query: { limit: `${limit.value}`, page: `${page.value}` } });
  };

  const updateLimit = (value: number): void => {
    limit.value = value;
  };

  watch(totalPage, (newTotalPage) => {
    if (page.value > newTotalPage) page.value = newTotalPage;
  });

  watch([page, limit], ([newPage, newLimit]) => {
    localStorage.setItem('RSOnlineStore-cart-page', `${newPage}`);
    localStorage.setItem('RSOnlineStore-cart-limit', `${newLimit}`);
    addQueries();
  });

  onBeforeMount(() => {
    const pageLocalStorage: string | null = localStorage.getItem('RSOnlineStore-cart-page');
    const limitLocalStorage: string | null = localStorage.getItem('RSOnlineStore-cart-limit');
    if (pageLocalStorage) page.value = Number(pageLocalStorage);
    if (limitLocalStorage) limit.value = Number(limitLocalStorage);
    addQueries();
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
