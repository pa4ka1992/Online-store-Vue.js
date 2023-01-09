import { defineStore } from 'pinia';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { IProduct } from '@/services//model/product';
import { ICartItem, CartItem, TProductFunc, TFindFunc, TCurrProd } from './types';
import { LocalStorageApi } from '@/services/local-storage';
import { CartDefaultVal, LSKey } from './constants';

export const useCartStore = defineStore('cartStore', () => {
  const _cart = ref<ICartItem[]>([]);
  const _LS = LocalStorageApi.getInstance();

  const totalProducts = computed((): number => {
    return _cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const cart = computed(() => [..._cart.value]);

  const clearCart = (): void => {
    _cart.value = [];
  }

  const findProduct: TFindFunc<ICartItem> = (id) => {
    return _cart.value.find((cartItem) => {
      return cartItem.product.id === id;
    });
  };

  const addProduct = (product: IProduct, count = CartDefaultVal.ProductCount): void => {
    if (!findProduct(product.id)) _cart.value.push(new CartItem(product, count));
  };

  const dropProduct = (product: IProduct): void => {
    if (findProduct(product.id)) {
      _cart.value = _cart.value.filter((prod) => product.id !== prod.product.id);
    }
  };

  const incrementCount: TProductFunc = (cartItem) => {
    const currProduct: TCurrProd = findProduct(cartItem.product.id);
    if (currProduct) currProduct.count += 1;
  };

  const decrementCount: TProductFunc = (cartItem) => {
    const currProduct: TCurrProd = findProduct(cartItem.product.id);

    if (currProduct) {
      if (currProduct.count < CartDefaultVal.decrementLimit) {
        _cart.value = _cart.value.filter((item) => cartItem.product.id !== item.product.id);
      } else {
        currProduct.count -= 1;
      }
    }
  };

  const updateCount = (val: number, cartItem: ICartItem) => {
    const currProduct: TCurrProd = findProduct(cartItem.product.id);

    if (currProduct) {
      if (val > currProduct.product.stock) {
        currProduct.count = currProduct.product.stock;
      } else if (val === 0) {
        currProduct.count = CartDefaultVal.ProductCount;
      } else currProduct.count = val;
    }
  };

  watch(
    _cart,
    (newCart) => {
      _LS.setProperty(LSKey.cart, newCart);
    },
    { deep: true },
  );

  onBeforeMount(() => {
    const cartLS: unknown = _LS.getProperty(LSKey.cart);
    if (cartLS instanceof Array<ICartItem>) {
      cartLS.forEach((item) => addProduct(item.product, item.count));
    }
  });

  return {
    cart,
    clearCart,
    totalProducts,
    findProduct,
    addProduct,
    dropProduct,
    incrementCount,
    decrementCount,
    updateCount,
  };
});
