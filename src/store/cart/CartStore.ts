import { defineStore } from 'pinia';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { IProduct } from '@/services//model/product';
import { ICartProduct, TProductFunc, TFindFunc, TCurrProd } from './types';

export const useCartStore = defineStore('cartStore', () => {
  const _cart = ref<ICartProduct[]>([]);

  const totalProducts = computed((): number => {
    return _cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const cart = computed((): ICartProduct[] => [..._cart.value]);

  const getProducts = async () => {
    const res: Response = await fetch('https://dummyjson.com/products?limit=100', { method: 'GET' })
    const parse: { products: IProduct[] } = await res.json();
    const products:  IProduct[] = parse.products;
    products.map((product) => {
      addProduct(product);
    })
  };

  const findProduct: TFindFunc<ICartProduct> = (incomeProduct) => {
    return _cart.value.find((product) => {
      return product.id === incomeProduct.id;
    });
  };

  const addProduct = (incomeProduct: IProduct): void => {
    const cartProduct: ICartProduct = {
      ...incomeProduct,
      count: 1,
      get countPrice() {
        return this.count * this.price;
      },
      get fixPrice() {
        return this.countPrice * (1 - this.discountPercentage / 100);
      },
    };
    _cart.value.push(cartProduct);
  };

  const deleteProduct = (incomeProduct: ICartProduct): void => {
    _cart.value = _cart.value.filter((prod) => incomeProduct.id !== prod.id);
  };

  const incrementCount: TProductFunc = (incomeProduct) => {
    const currProduct: TCurrProd = findProduct(incomeProduct);
    if (currProduct) currProduct.count += 1;
  };

  const decrementCount: TProductFunc = (incomeProduct) => {
    const currProduct: TCurrProd = findProduct(incomeProduct);
    if (currProduct) {
      if (currProduct.count < 2) {
        _cart.value = _cart.value.filter((prod) => incomeProduct.id !== prod.id);
      } else {
        currProduct.count -= 1;
      }
    }
  };

  const updateCount = (val: string, incomeProduct: ICartProduct) => {
    const currProduct: TCurrProd = findProduct(incomeProduct);
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
      const cartToLocal: string = JSON.stringify(newCart.value);
      localStorage.setItem('RSOnlineStore-cart', cartToLocal);
    },
    { deep: true },
  );

  onBeforeMount(async () => {
    await getProducts();
    const cartLocalStorage: string | null = localStorage.getItem('RSOnlineStore-cart');
    if (cartLocalStorage) {
      _cart.value = [];
      const newCart: ICartProduct[] = JSON.parse(cartLocalStorage);
      newCart.forEach((product) => {
        Object.defineProperties(product, {
          countPrice: {
            get: function () {
              return this.count * this.price;
            },
          },
          fixPrice: {
            get: function () {
              return this.countPrice * (1 - this.discountPercentage / 100);
            },
          },
        });
      });
      _cart.value = newCart;
    }
  });

  return {
    cart,
    totalProducts,
    addProduct,
    deleteProduct,
    incrementCount,
    decrementCount,
    updateCount,
  };
});
