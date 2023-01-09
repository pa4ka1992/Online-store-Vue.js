import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, beforeEach, test, expect } from 'vitest';
import { useProducts } from '@/store';
import { mock } from './_mock';

describe('products', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('fetchData works correctly', async () => {
    const { fetchData } = useProducts();
    const { products } = storeToRefs(useProducts());

    await fetchData();

    expect(products.value.length).toBe(100);
  });

  test('getProductById returns product', async () => {
    const { fetchData, getProductById } = useProducts();

    await fetchData();

    const product = getProductById('50');

    const fetchKeys: string[] | undefined = product ? Object.keys(product) : undefined;
    const productKeys: string[] = Object.keys(mock.product1);

    expect(fetchKeys?.toString() === productKeys.toString()).toBeTruthy();
  });
});
