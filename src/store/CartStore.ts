import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { IProduct, ICartProduct } from '@/services//model/product';
import { Promos } from '@/services/model/constants/cart';

type productFunc = (product: ICartProduct) => void;
type findFunc = (product: ICartProduct) => ICartProduct | undefined;
type currProd = ReturnType<findFunc>;

export const useCartStore = defineStore('cartStore', () => {
  const cart = ref<ICartProduct[]>([
    {
      id: '1',
      title: 'iphone 9',
      category: 'phones',
      brand: 'iphone',
      discountPercentage: '123123',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      price: 1200,
      rating: 4.5,
      thumbnail: '',
      images: ['https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg'],
      stock: 23,
      count: 2,
      get countPrice() {
        return this.count * this.price;
      },
    },
    {
      id: '2',
      title: 'iphone 10',
      category: 'phones',
      brand: 'iphone',
      discountPercentage: '123123',
      description: '123123123',
      price: 1000,
      rating: 4.5,
      thumbnail: '',
      images: ['https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg'],
      stock: 23,
      count: 2,
      get countPrice() {
        return this.count * this.price;
      },
    },
    {
      id: '3',
      title: 'iphone 11',
      category: 'phones',
      brand: 'iphone',
      discountPercentage: '123123',
      description: '123123123',
      price: 1000,
      rating: 4.5,
      thumbnail: '',
      images: ['https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg'],
      stock: 23,
      count: 2,
      get countPrice() {
        return this.count * this.price;
      },
    },
  ]);
  const promo = ref('');
  const page = ref(1);
  const limit = ref(10);
  const maxLimit = 10;
  const isDiscounted = ref(false);

  const getPromoPrice = computed((): number => {
    const keys = <(keyof typeof Promos)[]>Object.keys(Promos)
    const isMatch: keyof typeof Promos | undefined = keys.find((key) => {
      return key === promo.value;
    });
    if (isMatch) {
      isDiscounted.value = true;
      return totalPrice.value * Promos[isMatch];
    } else {
      isDiscounted.value = false;
      return totalPrice.value;
    }
  });

  const totalPrice = computed((): number => {
    return cart.value.reduce((totalSum, product) => {
      return totalSum + product.price * product.count;
    }, 0);
  });

  const totalProducts = computed((): number => {
    return cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const totalPage = computed((): number => {
    if (!limit.value) return 1;
    if (!cart.value || Number.isNaN(cart.value.length) || Number.isNaN(limit.value) || limit.value <= 0) {
      return 1;
    }
    const pages: number = Math.ceil(cart.value.length / limit.value);
    return pages > 1 ? pages : 1;
  });

  const pageProducts = computed((): ICartProduct[] => {
    return cart.value.slice(limit.value * (page.value - 1), limit.value * page.value);
  });

  const findProduct: findFunc = (incomeProduct) => {
    return cart.value.find((product) => {
      return product.id === incomeProduct.id;
    });
  };

  const addRemoveProduct = (incomeProduct: IProduct): void => {
    const cartProduct: ICartProduct = {
      ...incomeProduct,
      count: 1,
      get countPrice() {
        return this.count * this.price;
      },
    };
    if (cart.value.length === 0) {
      cart.value.push(cartProduct);
      return;
    }

    if (findProduct(cartProduct)) {
      cart.value = cart.value.filter((prod) => incomeProduct.id !== prod.id);
    } else {
      cart.value.push(cartProduct);
    }
  };

  const incrementCount: productFunc = (incomeProduct) => {
    const currProduct: currProd = findProduct(incomeProduct);
    if (currProduct) currProduct.count += 1;
  };

  const decrementCount: productFunc = (incomeProduct) => {
    const currProduct: currProd = findProduct(incomeProduct);
    if (currProduct) {
      if (currProduct.count < 2) {
        cart.value = cart.value.filter((prod) => incomeProduct.id !== prod.id);
      } else {
        currProduct.count -= 1;
      }
    }
  };

  return {
    cart,
    totalPrice,
    totalProducts,
    pageProducts,
    promo,
    isDiscounted,
    page,
    totalPage,
    limit,
    maxLimit,
    addRemoveProduct,
    incrementCount,
    decrementCount,
    getPromoPrice,
  };
});
