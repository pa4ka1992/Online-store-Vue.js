import { type IProduct } from '@/services';
import { computed } from 'vue';
import { useCart } from '@/store';

export function useProductInfo(product: IProduct) {
  const cartStore = useCart();

  const inCart = computed(() => {
    return cartStore.findProduct(product.id);
  });

  function toggleProduct() {
    !inCart.value ? cartStore.addProduct(product) : cartStore.dropProduct(product.id);
  }

  return {
    toggleProduct,
    inCart,
  };
}
