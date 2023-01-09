import { type IProduct } from '@/services'
import { computed } from 'vue';
import { useCartStore } from '@/store';

export function useProductInfo(product: IProduct) {
  const cartStore = useCartStore();

  const inCart = computed(() => {
    return cartStore.findProduct(product.id);
  });

  function toggleProduct() {
    if (!inCart.value) cartStore.addProduct(product);
    else cartStore.dropProduct(product);
  };

  return {
    toggleProduct,
    inCart,
  };
}