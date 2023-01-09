import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, beforeEach, test, expect } from 'vitest';
import { useProducts } from '@/store';
import { product1 } from './_mock';

describe('products', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('fetchData works correctly', async () => {
    const { fetchData } = useProducts();
    const { products } = storeToRefs(useProducts());

    await fetchData();

    expect(products.value.length).not.toBe(0);
  }, 10000);

  test('getProductById returns product', async () => {
    const { fetchData, getProductById } = useProducts();

    await fetchData();

    const product = getProductById(50);

    const fetchKeys: string[] | undefined = product ? Object.keys(product) : undefined;
    const productKeys: string[] = Object.keys(product1);
    
    expect(productKeys.reduce((acc, val) => acc && (fetchKeys?.includes(val) ?? false), true)).toBeTruthy();
  });
});
