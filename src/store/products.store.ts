import { defineStore } from 'pinia';
import { ref, type Ref, computed } from 'vue';
import {
  type IFilter,
  type ISort,
  type IProduct,
  ProductRepository,
  useStringSort,
  type TProductKeys,
  type TValuesCount,
  type TValuesCountMap,
} from '@/services';

export const useProductsStore = defineStore('products', () => {
  const _products: Ref<IProduct[]> = ref([]);
  const repo = ProductRepository.getInstance();
  const _productMap: Ref<{ [key: string]: IProduct }> = ref({});
  const loaded = ref(false);

  async function fetchData() {
    _products.value = await repo.fetchProducts();
    _products.value.forEach((item) => (_productMap.value[item.id] = item));
    loaded.value = true;
  }

  fetchData();

  const products = computed(() => {
    return _products.value
      .filter((product) => {
        let result = true;
        for (const value of filters.value) {
          result = Array.isArray(value[1])
            ? value[1].reduce((acc, item) => acc && item(product), result)
            : value[1](product);
          if (!result) return false;
        }
        return result;
      })
      .sort(_sortType.value.cmpFunc);
  });

  const productsRaw = computed(() => {
    return [..._products.value];
  });

  function getProductById(id: IProduct['id']) {
    return _productMap.value[id];
  }

  function countValues<Key extends TProductKeys>(key: Key, map: TValuesCountMap<Key>) {
    map.forEach((value) => (value.count = 0));
    for (const product of products.value) {
      const value = map.get(product[key]);
      value ? value.count++ : null;
    }
    return map;
  }

  function getValuesCountMap<Key extends TProductKeys>(key: Key): TValuesCountMap<Key> {
    const result = new Map<IProduct[Key], TValuesCount>();
    for (const product of _products.value) {
      const value = result.get(product[key]);
      if (!value) result.set(product[key], { count: 0, total: 1 });
      else value.total++;
    }

    countValues(key, result);
    return result;
  }

  const filters: Ref<Map<string, IFilter[] | IFilter>> = ref(new Map());

  const defaultSort = useStringSort('title');

  const sortType: Ref<ISort | null> = ref(null);

  const _sortType = computed({
    get() {
      return sortType.value ?? defaultSort;
    },
    set(value: ISort) {
      sortType.value = value;
    },
  });

  return {
    products,
    filters,
    sortType,
    defaultSort,
    productsRaw,
    loaded,
    countValues,
    fetchData,
    getProductById,
    getValuesCountMap,
  };
});
