import { computed, watchEffect } from 'vue';
import { useProductsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { type TNumberFields, type IProduct, useRangeFilter } from '@/services';
import { useQueryParam } from './query-param';
import { isNumberArray } from '@/utils';

export function useFilterByRange<Key extends keyof TNumberFields>(key: Key) {
  const productStore = useProductsStore();
  const { products, productsRaw } = storeToRefs(productStore);
  const { param } = useQueryParam(key);

  function findMin(array: IProduct[]) {
    return array.reduce((acc, value) => (acc > value[key] ? value[key] : acc), Number.POSITIVE_INFINITY);
  }

  function findMax(array: IProduct[]) {
    return array.reduce((acc, value) => (acc < value[key] ? value[key] : acc), Number.NEGATIVE_INFINITY);
  }

  const maxTotal = computed(() => {
    return findMax(productsRaw.value);
  });

  const minTotal = computed(() => {
    return findMin(productsRaw.value);
  });

  const max = computed({
    get() {
      return findMax(products.value);
    },
    set(value) {
      setBounds({ upper: value });
    },
  });

  const min = computed({
    get() {
      return findMin(products.value);
    },
    set(value) {
      setBounds({lower: value});
    }
  });

  function setBounds(bounds: {upper?: number, lower?: number }) {
    if (!bounds.upper && !bounds.lower) {
      param.value = null;
    } else {
      const array = [];
      array.push(bounds.lower && bounds.lower !== minTotal.value ? bounds.lower : min.value); 
      array.push(bounds.upper && bounds.upper !== maxTotal.value ? bounds.upper : max.value);
      param.value = array.length > 0 ? array : null;
    }
  }

  watchEffect(() => {    
    if (!isNumberArray(param.value)) productStore.filters.set(key, () => true);
    else productStore.filters.set(key, useRangeFilter(key, { lower: param.value[0], upper: param.value[1] }));
  });

  return { max, maxTotal, min, minTotal };
}
