import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { IProduct } from '@/services//model/product';
import { ICartItem, TProductFunc, TFindFunc, TCurrProd, CartItem } from './_types';
import { LocalStorageApi } from '@/services/local-storage';
import { CartDefaultVal, LSKey } from './_constants';

export const useCart = defineStore('cart', () => {
  const _cart = ref<ICartItem[]>([]);
  const _LS = LocalStorageApi.getInstance();

  const totalProducts = computed((): number => {
    return _cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const cart = computed((): ICartItem[] => [..._cart.value]);

  const clearCart = (): void => {
    _cart.value = [];
  };

  const findProduct: TFindFunc<ICartItem> = (id) => {
    return _cart.value.find((item) => {
      return item.product.id === id;
    });
  };

  const addProduct = (product: IProduct, count = CartDefaultVal.ProductCount): void => {
    if (!findProduct(product.id)) {
      const cartProduct: ICartItem = new CartItem(product, count);
      _cart.value.push(cartProduct);
    }
  };

  const dropProduct = (id: IProduct['id']): void => {
    if (findProduct(id)) {
      _cart.value = _cart.value.filter((item) => id !== item.product.id);
    }
  };

  const incrementCount: TProductFunc = (id) => {
    const currProduct: TCurrProd = findProduct(id);

    if (currProduct) currProduct.count += 1;
  };

  const decrementCount: TProductFunc = (id) => {
    const currProduct: TCurrProd = findProduct(id);

    if (currProduct) {
      if (currProduct.count < CartDefaultVal.decrementLimit) {
        _cart.value = _cart.value.filter((item) => id !== item.product.id);
      } else {
        currProduct.count -= 1;
      }
    }
  };

  const updateCount = (val: string, id: IProduct['id']) => {
    const currItem: TCurrProd = findProduct(id);
    const valNumber = Number(val);

    if (currItem) {
      if (!valNumber) {
        dropProduct(id);
        return;
      }
      if (valNumber > currItem.product.stock) {
        currItem.count = currItem.product.stock;
        return;
      }
      currItem.count = valNumber;
    }
  };

  watch(_cart, (newCart) => {
      _LS.setProperty(LSKey.cart, newCart);
    }, { deep: true },
  );

  (function initStore() {
    const cartLS: unknown = _LS.getProperty(LSKey.cart);
    if (cartLS instanceof Array<ICartItem>) {
      cartLS.forEach((item) => addProduct(item.product, item.count));
    }
  })();

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
