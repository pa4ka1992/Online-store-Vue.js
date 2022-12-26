import { defineStore } from 'pinia';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { IProduct } from '@/services//model/product';
import { ICartProduct, TProductFunc, TFindFunc, TCurrProd } from './types';

export const useCartStore = defineStore('cartStore', () => {
  const cart = ref<ICartProduct[]>([]);

  const totalProducts = computed((): number => {
    return cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const getProducts = async () => {
    const res: Response = await fetch('https://dummyjson.com/products?limit=100', { method: 'GET' })
    const parse: { products: IProduct[] } = await res.json();
    const products:  IProduct[] = parse.products;
    products.map((product) => {
      addProduct(product);
    })
  };

  const getCart = (): ICartProduct[] => [...cart.value];

  const findProduct: TFindFunc<ICartProduct> = (incomeProduct) => {
    return cart.value.find((product) => {
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
    cart.value.push(cartProduct);
  };

  const deleteProduct = (incomeProduct: ICartProduct): void => {
    cart.value = cart.value.filter((prod) => incomeProduct.id !== prod.id);
  };

  const incrementCount: TProductFunc = (incomeProduct) => {
    const currProduct: TCurrProd = findProduct(incomeProduct);
    if (currProduct) currProduct.count += 1;
  };

  const decrementCount: TProductFunc = (incomeProduct) => {
    const currProduct: TCurrProd = findProduct(incomeProduct);
    if (currProduct) {
      if (currProduct.count < 2) {
        cart.value = cart.value.filter((prod) => incomeProduct.id !== prod.id);
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
    () => cart,
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
      cart.value = [];
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
      cart.value = newCart;
    }
  });

  return {
    cart,
    getCart,
    totalProducts,
    addProduct,
    deleteProduct,
    incrementCount,
    decrementCount,
    updateCount,
  };
});
