import { computed, watch, ref, type Ref } from 'vue';
import { useProductsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { type TNumberFields, type IProduct, useRangeFilter, TRangeBounds } from '@/services';
import { useQueryParam } from './query-param';
import { isNumberArray } from '@/utils';

export function useFilterByRange<Key extends keyof TNumberFields>(key: Key) {
  const productStore = useProductsStore();
  const { productsRaw, loaded } = storeToRefs(productStore);
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

  const bounds: Ref<TRangeBounds> = ref({});

  const loaderWatch = watch(loaded, () => {
    if (loaded.value) {
      bounds.value = !isNumberArray(param.value)
        ? {
            upper: maxTotal.value,
            lower: minTotal.value,
          }
        : {
            upper: param.value[1],
            lower: param.value[0],
          };
      loaderWatch();
    }
  })

  function setBounds(bounds: TRangeBounds) {
    if (!bounds.upper && !bounds.lower) {
      param.value = null;
    } else {
      const array = [];
      array.push(bounds.lower && bounds.lower !== minTotal.value ? bounds.lower : minTotal.value);
      array.push(bounds.upper && bounds.upper !== maxTotal.value ? bounds.upper : maxTotal.value);
      param.value = array.length > 0 ? array : null;
    }
  }

  function applyBounds() {
    setBounds(bounds.value);
  }

  function syncWithQuery() {
    if (!isNumberArray(param.value)) {
      productStore.filters.set(key, () => true);
      bounds.value = {
        upper: maxTotal.value,
        lower: minTotal.value,
      };
    } else {
      productStore.filters.set(key, useRangeFilter(key, { lower: param.value[0], upper: param.value[1] }));
      bounds.value = {
        upper: param.value[1],
        lower: param.value[0],
      };
    }
  }

  watch(param, () => {
    syncWithQuery();
  }, {
    immediate: true
  });

  return { maxTotal, minTotal, bounds, applyBounds };
}
