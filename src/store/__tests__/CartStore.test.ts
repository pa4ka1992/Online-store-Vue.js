import { createPinia, setActivePinia } from 'pinia';
import { describe, beforeEach, test, expect } from 'vitest';
import { useCartStore } from '@/store';
import { mock } from './mock';

const { product1, product2, product3 } = mock;

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('addProduct adds product to the cart, doesn`t add product with identical id', () => {
    const cartStore = useCartStore();

    cartStore.addProduct(product1);
    cartStore.addProduct(product1);

    expect(cartStore.cart).toHaveLength(1);
  });

  test('dropProduct removes product from the cart, doesn`t remove non-existent product', () => {
    const cartStore = useCartStore();

    cartStore.addProduct(product1);
    cartStore.addProduct(product3);
    cartStore.dropProduct(product2);
    cartStore.dropProduct(product1);

    expect(cartStore.cart).toHaveLength(1);
  });

  test('findProduct finds product and it type is correct', () => {
    const cartStore = useCartStore();

    cartStore.addProduct(product1);
    const currProduct = cartStore.findProduct(product1.id);
    let countPrice;
    let fixPrice;

    if (currProduct) {
      countPrice = currProduct.price * currProduct.count;
      fixPrice = currProduct.countPrice * (1 - currProduct.discountPercentage / 100);
    }

    expect(currProduct).toBeTruthy();
    expect(currProduct).toHaveProperty('count', 1);
    expect(currProduct).toHaveProperty('countPrice', countPrice);
    expect(currProduct).toHaveProperty('fixPrice', fixPrice);
  });
});
