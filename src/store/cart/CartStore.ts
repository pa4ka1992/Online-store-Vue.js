import { defineStore } from 'pinia';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { IProduct, ICartProduct } from '@/services//model/product';

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
      discountPercentage: 12,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loralso the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      price: 1200,
      rating: 4.5,
      thumbnail: '',
      images: ['https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg'],
      stock: 23,
      count: 2,
      get countPrice() {
        return this.count * this.price;
      },
      get fixPrice() {
        return this.countPrice * (1 - this.discountPercentage / 100);
      },
    },
    {
      id: '2',
      title: 'iphone 9',
      category: 'phones',
      brand: 'iphone',
      discountPercentage: 12,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loralso the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      price: 1200,
      rating: 4.5,
      thumbnail: '',
      images: ['https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg'],
      stock: 23,
      count: 2,
      get countPrice() {
        return this.count * this.price;
      },
      get fixPrice() {
        return this.countPrice * (1 - this.discountPercentage / 100);
      },
    },
    {
      id: '3',
      title: 'iphone 9',
      category: 'phones',
      brand: 'iphone',
      discountPercentage: 12,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loralso the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      price: 1200,
      rating: 4.5,
      thumbnail: '',
      images: ['https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg'],
      stock: 23,
      count: 2,
      get countPrice() {
        return this.count * this.price;
      },
      get fixPrice() {
        return this.countPrice * (1 - this.discountPercentage / 100);
      },
    },
    {
      id: '4',
      title: 'iphone 9',
      category: 'phones',
      brand: 'iphone',
      discountPercentage: 12,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loralso the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      price: 1200,
      rating: 4.5,
      thumbnail: '',
      images: ['https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg'],
      stock: 23,
      count: 2,
      get countPrice() {
        return this.count * this.price;
      },
      get fixPrice() {
        return this.countPrice * (1 - this.discountPercentage / 100);
      },
    },
    {
      id: '5',
      title: 'iphone 9',
      category: 'phones',
      brand: 'iphone',
      discountPercentage: 12,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loralso the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      price: 1200,
      rating: 4.5,
      thumbnail: '',
      images: ['https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg'],
      stock: 23,
      count: 2,
      get countPrice() {
        return this.count * this.price;
      },
      get fixPrice() {
        return this.countPrice * (1 - this.discountPercentage / 100);
      },
    },
  ]);

  const totalProducts = computed((): number => {
    return cart.value.reduce((totalCount, product) => {
      return totalCount + product.count;
    }, 0);
  });

  const findProduct: findFunc = (incomeProduct) => {
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

  const updateCount = (val: string, incomeProduct: ICartProduct) => {
    const currProduct: currProd = findProduct(incomeProduct);
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

  onBeforeMount(() => {
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
    totalProducts,
    addProduct,
    deleteProduct,
    incrementCount,
    decrementCount,
    updateCount,
  };
});
