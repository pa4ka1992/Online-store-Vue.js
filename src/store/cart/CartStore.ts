import { defineStore } from 'pinia';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { IProduct } from '@/services//model/product';
import { ICartProduct, TProductFunc, TFindFunc, TCurrProd } from './types';
import { LocalStorageApi } from '@/services/local-storage';

export const useCartStore = defineStore('cartStore', () => {
  const _cart = ref<ICartProduct[]>([]);
  const _LS = LocalStorageApi.getInstance();

  const totalProducts = computed((): number => {
    return _cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const cart = computed((): ICartProduct[] => [..._cart.value]);

  const getProducts = async () => {
    const res: Response = await fetch('https://dummyjson.com/products?limit=5', { method: 'GET' });
    const parse: { products: IProduct[] } = await res.json();
    const products: IProduct[] = parse.products;

    products.map((product) => {
      addProduct(product);
    });
  };

  const findProduct: TFindFunc<ICartProduct> = (id) => {
    return _cart.value.find((product) => {
      return product.id === id;
    });
  };

  const addProduct = (incomeProduct: IProduct, incomeCount = 1): void => {
    if (!findProduct(incomeProduct.id)) {
      const cartProduct: ICartProduct = {
        ...incomeProduct,
        count: incomeCount,
        get countPrice() {
          return this.count * this.price;
        },
        get fixPrice() {
          return this.countPrice * (1 - this.discountPercentage / 100);
        },
      };

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
      if (currProduct.count < 2) {
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
        currProduct.count = 1;
        return;
      }
      currProduct.count = valNumber;
    }
  };

  watch(
    () => _cart,
    (newCart) => {
      _LS.setProperty('cart', newCart.value);
    },
    { deep: true },
  );

  onBeforeMount(() => {
    const cartLS = _LS.getProperty('cart');

    if (cartLS instanceof Array<ICartProduct>) {
      _cart.value = [];
      const newCart: ICartProduct[] = cartLS;

      newCart.forEach((product) => {
        addProduct(product, product.count);
      });
    } else {
      getProducts();
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
