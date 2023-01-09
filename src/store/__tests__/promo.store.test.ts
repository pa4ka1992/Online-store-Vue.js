import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, beforeEach, test, expect } from 'vitest';
import { useCart, usePromo } from '@/store';
import { mock } from './_mock';

const { product1, product2, product3 } = mock;

describe('products', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('totalPrice returns correct value', () => {
    const { totalPrice } = storeToRefs(usePromo());
    const { addProduct } = useCart();

    addProduct(product1);
    addProduct(product2);
    addProduct(product3);

    expect(totalPrice.value).toBe(10 * 0.9 + 20 * 0.8 + 30 * 0.7);
  });

  test('isMatch doesn`t exept wrong promocode', () => {
    const { promo, isMatch } = storeToRefs(usePromo());

    promo.value = 'asdasasdada';

    expect(isMatch.value).toBeFalsy();
  });

  test('applyPromo applies correct promocodes', () => {
    const { promo, appliedPromos } = storeToRefs(usePromo());
    const { applyPromo } = usePromo();

    promo.value = '121212';
    applyPromo();
    promo.value = 'gachi';
    applyPromo();

    expect(appliedPromos.value).toHaveLength(1);
  });

  test('removePromo works correctly', () => {
    const { promo, appliedPromos } = storeToRefs(usePromo());
    const { applyPromo, removePromo } = usePromo();

    promo.value = '300bucks';
    applyPromo();
    promo.value = 'gachi';
    applyPromo();
    removePromo(2);

    expect(appliedPromos.value).toHaveLength(1);
  });

  test('isAlreadyApplied finds applies promocode', () => {
    const { promo, isAlreadyApplied } = storeToRefs(usePromo());
    const { applyPromo } = usePromo();

    promo.value = '300bucks';
    applyPromo();
    promo.value = '300bucks';

    expect(isAlreadyApplied.value).toBeTruthy();
  });
});
