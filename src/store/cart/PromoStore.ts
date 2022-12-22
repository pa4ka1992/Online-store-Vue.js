import { defineStore, storeToRefs } from 'pinia';
import { useCartStore } from './CartStore';
import { ref, computed } from 'vue';
import { Promos } from '@/services/model/constants/cart';
import { TPromo } from '@/services/model/types/cart';

export const usePromoStore = defineStore('promoStore', () => {
  const { cart } = storeToRefs(useCartStore())
  const promo = ref('');
  const isDiscounted = ref(false);
  const appliedPromos = ref<TPromo[]>([]);

  const totalPrice = computed((): number => {
    return cart.value.reduce((totalSum, product) => {
      return totalSum + product.price * product.count * (1 - product.discountPercentage / 100);
    }, 0);
  });

  const getPromoPrice = computed((): number => {
    const keys = <(keyof typeof Promos)[]>Object.keys(Promos);
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

  return {
    promo,
    isDiscounted,
    getPromoPrice,
    totalPrice
  };
});
