import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { IProduct } from './interfaces/product';

interface IcartProduct extends IProduct {
  count: number;
}
type productFunc = (product: IcartProduct) => void;
type findFunc = (product: IcartProduct) => IcartProduct | undefined;
type currProd = ReturnType<findFunc>;

export const useCartStore = defineStore('cartStore', () => {
  const cart = ref<Array<IcartProduct>>([]);
  const promo = ref<string>('');
  const page = ref<number>(1);
  const totalPage = ref<number>(0);
  const limit = ref<number>(10);

  const totalPrice = computed(() => {
    return cart.value.reduce((totalSum, product) => {
      return totalSum + product.price * product.count;
    }, 0);
  });

  const totalProducts = computed(() => {
    return cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const findProduct: findFunc = (incomeProduct) => {
      return cart.value.find((product) => {
      product.id === incomeProduct.id;
    });
  }

  const addRemoveProduct: productFunc = (incomeProduct) => {
    const cartProduct: IcartProduct = { ...incomeProduct, count: 1 };
    if (cart.value.length === 0) {
      cart.value.push(cartProduct);
      return;
    }

    if (findProduct(incomeProduct)) {
      cart.value = cart.value.filter((prod) => incomeProduct.id !== prod.id);
    } else {
      cart.value.push(cartProduct);
    }
  };

  const incrementCount: productFunc = (incomeProduct) => {
    const currProduct: currProd = findProduct(incomeProduct)
    if (currProduct) currProduct.count += 1;
  }

  const decrementCount: productFunc = (incomeProduct) => {
    const currProduct: currProd = findProduct(incomeProduct)
    if (currProduct) {
      if (currProduct.count < 2) {
        cart.value = cart.value.filter((prod) => incomeProduct.id !== prod.id);
      } else {
        currProduct.count -= 1;
      }
    }
  }

  // const addProduct = (addProduct: IcartProduct): void => {
  //   addProduct.count = 1;
  //   cart.value.push(addProduct);
  // };
  // const removeProduct = (remProduct: IcartProduct): void => {
  //   cart.value = cart.value.filter((prod) => remProduct.id !== prod.id);
  // };

  return {
    cart,
    totalPrice,
    totalProducts,
    promo,
    page,
    totalPage,
    limit,
    addRemoveProduct,
    incrementCount,
    decrementCount
  };
});
