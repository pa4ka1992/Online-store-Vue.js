import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, beforeEach, test, expect } from 'vitest';
import { useCart } from '@/store';
import { mock, product1, product2, product3 } from './_mock';

describe('cart', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    useCart().clearCart();
  });

  test('addProduct adds product to the cart, doesn`t add product with identical id', () => {
    const { cart } = storeToRefs(useCart());
    const { addProduct } = useCart();

    mock.forEach((product) => {
      addProduct(product);
    });

    addProduct(product1);

    expect(cart.value).toHaveLength(3);
  });

  test('dropProduct removes product from the cart, doesn`t remove non-existent product', () => {
    const { cart } = storeToRefs(useCart());
    const { addProduct, dropProduct } = useCart();

    addProduct(product1);
    addProduct(product3);
    dropProduct(product2.id);
    dropProduct(product1.id);

    expect(cart.value).toHaveLength(1);
  });

  test('findProduct finds product and it type is correct', () => {
    const { addProduct, findProduct, dropProduct } = useCart();

    addProduct(product1);
    addProduct(product2);
    addProduct(product3);
    dropProduct(product3.id);
    const currItem = findProduct(product1.id);
    let countPrice;
    let fixPrice;

    if (currItem) {
      countPrice = currItem.product.actualPrice * currItem.count;
      fixPrice = currItem.product.actualPrice * (1 - currItem.product.discountPercentage / 100);
    }

    expect(currItem).toBeTruthy();
    expect(currItem).toHaveProperty('count', 1);
    expect(currItem).toHaveProperty('countPrice', countPrice);
    expect(currItem).toHaveProperty('fixPrice', fixPrice);
  });

  test('increment-decrementCount works correctly, totalProducts works correctly', () => {
    const { totalProducts } = storeToRefs(useCart());
    const { addProduct, dropProduct, incrementCount, decrementCount } = useCart();

    addProduct(product1);
    addProduct(product2);
    addProduct(product3);
    incrementCount(product1.id);
    incrementCount(product1.id);
    incrementCount(product2.id);
    incrementCount(product3.id);
    incrementCount(product3.id);
    dropProduct(product2.id);
    decrementCount(product1.id);
    decrementCount(product3.id);

    expect(totalProducts.value).toBe(4);
  });

  test('updateCount works correctly', () => {
    const { totalProducts } = storeToRefs(useCart());
    const { addProduct, updateCount } = useCart();

    addProduct(product1);
    addProduct(product2);

    updateCount('30', product1.id);
    updateCount('20', product2.id);

    expect(totalProducts.value).toBe(50);
  });

  test('updateCount doesn`t exceed stock value', () => {
    const { totalProducts } = storeToRefs(useCart());
    const { addProduct, updateCount } = useCart();

    addProduct(product1);
    addProduct(product2);

    updateCount('95', product1.id);
    updateCount('36', product2.id);

    expect(totalProducts.value).toBe(129);
  });

  test('updateCount drops products with count value 0', () => {
    const { cart } = storeToRefs(useCart());
    const { addProduct, updateCount } = useCart();

    addProduct(product1);
    addProduct(product2);

    updateCount('', product1.id);
    updateCount('', product2.id);

    expect(cart.value).toHaveLength(0);
  });

  test('clearCart works correctly', () => {
    const { cart } = storeToRefs(useCart());
    const { addProduct, clearCart } = useCart();

    addProduct(product1);
    addProduct(product2);
    addProduct(product3);

    clearCart();

    expect(cart.value).toHaveLength(0);
  });
});
