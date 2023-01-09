import { defineStore } from 'pinia';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { IProduct } from '@/services//model/product';
import { ICartProduct, TProductFunc, TFindFunc, TCurrProd } from './_types';
import { LocalStorageApi } from '@/services/local-storage';
import { CartProduct } from './_types';
import { CartDefaultVal, LSKey } from './_constants';

export const useCart = defineStore('cart', () => {
  const _cart = ref<ICartProduct[]>([]);
  const _LS = LocalStorageApi.getInstance();

  const totalProducts = computed((): number => {
    return _cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const cart = computed((): ICartProduct[] => [..._cart.value]);

  const clearCart = (): void => {
    _cart.value = [];
  };

  const findProduct: TFindFunc<ICartProduct> = (id) => {
    return _cart.value.find((product) => {
      return product.id === id;
    });
  };

  const addProduct = (incomeProduct: IProduct, incomeCount = CartDefaultVal.ProductCount): void => {
    if (!findProduct(incomeProduct.id)) {
      const cartProduct: ICartProduct = new CartProduct(incomeProduct, incomeCount);
      _cart.value.push(cartProduct);
    }
  };

  const dropProduct = (id: string): void => {
    if (findProduct(id)) {
      _cart.value = _cart.value.filter((prod) => id !== prod.id);
    }
  };

  const incrementCount: TProductFunc = (id: string) => {
    const currProduct: TCurrProd = findProduct(id);

    if (currProduct) currProduct.count += 1;
  };

  const decrementCount: TProductFunc = (id: string) => {
    const currProduct: TCurrProd = findProduct(id);

    if (currProduct) {
      if (currProduct.count < CartDefaultVal.decrementLimit) {
        _cart.value = _cart.value.filter((prod) => id !== prod.id);
      } else {
        currProduct.count -= 1;
      }
    }
  };

  const updateCount = (val: string, id: string) => {
    const currProduct: TCurrProd = findProduct(id);
    const valNumber = Number(val);

    if (currProduct) {
      if (!valNumber) {
        dropProduct(id);
        return
      }
      if (valNumber > currProduct.stock) {
        currProduct.count = currProduct.stock;
        return;
      }
      currProduct.count = valNumber;
    }
  };

  watch(
    () => _cart,
    (newCart) => {
      _LS.setProperty(LSKey.cart, newCart.value);
    },
    { deep: true },
  );

  onBeforeMount(() => {
    const cartLS: unknown = _LS.getProperty(LSKey.cart);
    if (cartLS instanceof Array<ICartProduct>) {
      const newCart: ICartProduct[] = cartLS;
      _cart.value = [];
      newCart.forEach((product) => {
        addProduct(product, product.count);
      });
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
