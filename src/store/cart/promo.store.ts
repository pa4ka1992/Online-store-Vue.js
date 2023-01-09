import { defineStore, storeToRefs } from 'pinia';
import { useCart } from './cart.store';
import { ref, computed } from 'vue';
import { Promos } from './_constants';
import { TPromo } from './_types';

export const usePromo = defineStore('promo', () => {
  const { cart } = storeToRefs(useCart());
  const promo = ref('');
  const appliedPromos = ref<TPromo[]>([]);

  const totalPrice = computed((): number => {
    return cart.value.reduce((totalSum, item) => {
      return totalSum + item.countPrice;
    }, 0);
  });

  const isDiscounted = computed((): boolean => {
    return appliedPromos.value.length > 0 ? true : false;
  });

  const getPromoPrice = computed((): number => {
    if (isDiscounted.value) {
      const totalDiscount: number = appliedPromos.value.reduce((fixPrice, promoCode) => {
        return fixPrice + promoCode.value;
      }, 0);
      return totalPrice.value * (1 - totalDiscount);
    } else {
      return totalPrice.value;
    }
  });

  const isMatch = computed((): boolean => {
    return !!Promos.find((code) => code.name === promo.value);
  });

  const isAlreadyApplied = computed((): boolean => {
    return !!appliedPromos.value.find((code) => code.name === promo.value);
  });

  const applyPromo = (): void => {
    Promos.forEach((promoCode) => {
      if (promoCode.name === promo.value && !isAlreadyApplied.value) {
        appliedPromos.value.push(promoCode);
      }
    });
    promo.value = '';
  };

  const removePromo = (id: number): void => {
    appliedPromos.value = appliedPromos.value.filter((promoCode) => id !== promoCode.id);
  };

  return {
    promo,
    isDiscounted,
    isMatch,
    isAlreadyApplied,
    getPromoPrice,
    totalPrice,
    appliedPromos,
    applyPromo,
    removePromo,
  };
});
