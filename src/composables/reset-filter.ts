import { sortQueryKey } from './sort-option-list';
import { viewQueryKey } from './product-view';
import { useRouter, LocationQueryRaw } from 'vue-router';

export function useResetFilters() {
  const { push, currentRoute } = useRouter();

  const ignoreParams = [viewQueryKey, sortQueryKey];

  function resetFilters() {
    push({
      query: ignoreParams.reduce((acc: LocationQueryRaw, value) => {
        acc[value] = currentRoute.value.query[value];
        return acc;
      }, {}),
    });
  }

  return { 
    resetFilters 
  };
}
