import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, beforeEach, test, expect } from 'vitest';
import { useCart, usePagination } from '@/store';
import { mock } from './_mock';

const { product1, product2, product3 } = mock;

describe('products', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('totalPage returns correct value', () => {
    const { totalPage, limit } = storeToRefs(usePagination());
    const { addProduct } = useCart();

    addProduct(product1);
    addProduct(product2);
    addProduct(product3);
    limit.value = 1;

    expect(totalPage.value).toBe(3);
  });

  test('pageProducts returns array with correct count of products on page', () => {
    const { page, limit, pageProducts } = storeToRefs(usePagination());
    const { addProduct } = useCart();

    addProduct(product3);
    addProduct(product1);
    addProduct(product2);

    limit.value = 2;
    page.value = 2;

    expect(Array.isArray(pageProducts.value)).toBeTruthy();
    expect(pageProducts.value).toHaveLength(1);
    expect(pageProducts.value.filter((product) => product.id === '2')).toBeTruthy();
  });

  test('pageProducts returns array with correct count of products on page', () => {
    const { page, limit, pageProducts } = storeToRefs(usePagination());
    const { addProduct } = useCart();

    addProduct(product3);
    addProduct(product1);
    addProduct(product2);

    limit.value = 2;
    page.value = 2;

    expect(Array.isArray(pageProducts.value)).toBeTruthy();
    expect(pageProducts.value).toHaveLength(1);
    expect(pageProducts.value.filter((product) => product.id === '2')).toBeTruthy();
  });

  test('startIndex returns correct order index', () => {
    const { page, limit, startIndex } = storeToRefs(usePagination());
    const { addProduct } = useCart();

    addProduct(product3);
    addProduct(product2);
    addProduct(product1);

    limit.value = 1;
    page.value = 3;

    expect(startIndex.value).toBe(3);
  });
});
