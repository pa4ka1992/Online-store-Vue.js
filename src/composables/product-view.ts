import { useQueryParam } from './query-param';
import { ref, watchEffect, computed } from 'vue';
import { isStringArray, isString } from '@/utils';

export enum ViewType {
  Grid = 'grid',
  List = 'list'
}

function isViewType(value: unknown): value is ViewType {
  return isString(value) && (Object.values(ViewType) as string[]).includes(value);
}

export function useProductView() {
  const { param } = useQueryParam('view');

  const _type = ref(ViewType.Grid);

  watchEffect(() => {
    if (isStringArray(param.value) && isViewType(param.value[0]))
      _type.value = param.value[0] as ViewType;
    else 
      _type.value = ViewType.Grid;
  })

  const type = computed({
    get() {
      return _type.value;
    },
    set(value: ViewType) {
      param.value = [value];
    }
  });

  return {
    type
  }
}