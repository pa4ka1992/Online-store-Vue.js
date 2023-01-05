import { type IProduct, fixPrice } from '@/services'
import { computed } from 'vue';
import { useCartStore } from '@/store';

export function useProductInfo(product: IProduct) {
  const fixedPrice = computed(() => {
    return fixPrice(product);
  });

  const cartStore = useCartStore();

  const inCart = computed(() => {
    return cartStore.cart.findIndex((value) => product.id === value.id) !== -1;
  });

  function toggleProduct() {
    if (!inCart.value) cartStore.addProduct(product);
    else cartStore.deleteProduct(product);
  };

  return {
    fixedPrice,
    toggleProduct,
    inCart,
  };
}