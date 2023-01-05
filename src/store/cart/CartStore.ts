import { defineStore } from 'pinia';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { IProduct } from '@/services//model/product';
import { ICartProduct, TProductFunc, TFindFunc, TCurrProd } from './types';
import { LocalStorageApi } from '@/services/local-storage';
import { CartProduct } from './types';
import { CartDefaultVal, LSKey } from './constants';

export const useCartStore = defineStore('cartStore', () => {
  const _cart = ref<ICartProduct[]>([]);
  const _LS = LocalStorageApi.getInstance();

  const totalProducts = computed((): number => {
    return _cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const cart = computed((): ICartProduct[] => [..._cart.value]);

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

  const dropProduct = (incomeProduct: IProduct): void => {
    if (findProduct(incomeProduct.id)) {
      _cart.value = _cart.value.filter((prod) => incomeProduct.id !== prod.id);
    }
  };

  const incrementCount: TProductFunc = (incomeProduct) => {
    const currProduct: TCurrProd = findProduct(incomeProduct.id);

    if (currProduct) currProduct.count += 1;
  };

  const decrementCount: TProductFunc = (incomeProduct) => {
    const currProduct: TCurrProd = findProduct(incomeProduct.id);

    if (currProduct) {
      if (currProduct.count < CartDefaultVal.decrementLimit) {
        _cart.value = _cart.value.filter((prod) => incomeProduct.id !== prod.id);
      } else {
        currProduct.count -= 1;
      }
    }
  };

  const updateCount = (val: string, incomeProduct: ICartProduct) => {
    const currProduct: TCurrProd = findProduct(incomeProduct.id);
    const valNumber = Number(val);

    if (currProduct) {
      if (valNumber > currProduct.stock) {
        currProduct.count = currProduct.stock;
        return;
      }
      if (valNumber === 0) {
        currProduct.count = CartDefaultVal.ProductCount;
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
      _cart.value = [];
      const newCart: ICartProduct[] = cartLS;

      newCart.forEach((product) => {
        addProduct(product, product.count);
      });
    }
  });

  return {
    cart,
    totalProducts,
    findProduct,
    addProduct,
    dropProduct,
    incrementCount,
    decrementCount,
    updateCount,
  };
});
