import { ref, watch, computed, type Ref } from 'vue';
import { useProductsStore } from '@/store';
import { storeToRefs } from 'pinia';
import {
  type TStringFields,
  useEqualFilter,
  type TValuesCount,
  type IProduct,
} from '@/services';
import { isStringArray } from '@/utils';
import { useQueryParam } from './query-param';

type TFilterCount = TValuesCount & { checked?: boolean };
type TNamedFilterCount = TFilterCount & { name: string };

export function useFilterByCategory<Key extends keyof TStringFields>(key: Key) {
  const productStore = useProductsStore();
  const { products, productsRaw } = storeToRefs(productStore);
  const { param } = useQueryParam(key);

  const map: Ref<Map<IProduct[Key], TFilterCount>> = ref(productStore.getValuesCountMap(key));

  const categories = computed(() => {
    const result: TNamedFilterCount[] = [];
    for (const [key, value] of map.value)
      result.push({
        name: key,
        checked: map.value.get(key)?.checked ?? false,
        ...value,
      });
    return result;
  });

  function updateFilters() {
    if (isStringArray(param.value)) {
      setFilters(param.value);
    } else setFilters([]);
  }

  watch(products, () => {
    map.value = productStore.countValues(key, map.value);
  });

  watch(productsRaw, () => {
    map.value = productStore.getValuesCountMap(key);
    updateFilters();
  });

  watch(param, () => {
    updateFilters();
  });

  function setFilters(categories: string[]) {
    for (const pair of map.value)
      pair[1].checked = false;
    const filters = categories.map((category) => {
        const obj = map.value.get(category);
        if (obj) obj.checked = true;
        return useEqualFilter(key, category);
    });

    productStore.filters.set(
      key,
      (product: IProduct) => filters.length !== 0 ? filters.reduce((acc, value) => acc || value(product), false) : true,
    );
  }

  function toggleCategory(category: string) {
    const mapValue = map.value.get(category);
    if (!mapValue) throw new Error('Category not found in map!');
    mapValue.checked = !mapValue.checked ?? true;
    const arr = isStringArray(param.value) ? param.value : [];
    if (mapValue.checked)
      param.value = [...arr, category];
    else {
      const index = arr.indexOf(category);
      if (index !== -1) arr.splice(index, 1);
      param.value = arr.length !== 0 ?  [...arr] : null;
    }
  }

  return { map, categories, toggleCategory };
}
