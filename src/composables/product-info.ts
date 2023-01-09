import { type IProduct, fixPrice } from '@/services'
import { computed } from 'vue';
import { useCart } from '@/store';

export function useProductInfo(product: IProduct) {
  const fixedPrice = computed(() => {
    return fixPrice(product);
  });

  const cartStore = useCart();

  const inCart = computed(() => {
    return cartStore.findProduct(product.id);
  });

  function toggleProduct() {
    if (!inCart.value) cartStore.addProduct(product);
    else cartStore.dropProduct(product.id);
  };

  return {
    fixedPrice,
    toggleProduct,
    inCart,
  };
}