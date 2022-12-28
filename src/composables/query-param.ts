import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { isStringArray, isNumber, isString } from '@/utils';

const urlSeparator = ';';

export type TQueryParameter = number | string[] | null;

export function useQueryParam(key: string) {
  const router = useRouter();

  const param = computed({
    get() {
      const queryParam = router.currentRoute.value.query[key];
      if (isNumber(Number(queryParam))) return Number(queryParam);
      else if (isString(queryParam)) return queryParam.split(urlSeparator);
      else return null;
    },
    set(value) {
      let setValue: number | string | undefined = undefined;

      if (isNumber(value)) setValue = value;
      else if (isStringArray(value)) setValue = value.join(urlSeparator);

      router.push({
        query: {
          ...router.currentRoute.value.query,
          [key]: setValue,
        },
      });
    },
  });

  return { param };
}

