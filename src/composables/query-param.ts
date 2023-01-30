import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { isStringArray, isNumberArray, isString } from '@/utils';

const urlSeparator = ';';

export type TQueryParameter = number[] | string[] | null;

export function useQueryParam(key: string, disableNumber = false) {
  const router = useRouter();

  const param = computed({
    get() {
      const queryParam = router.currentRoute.value.query[key];
      if (isString(queryParam)) {
        const array = queryParam.split(urlSeparator);
        if (isNumberArray(array) && !disableNumber) {
          return array.map((value) => Number(value));
        } else {
          return array;
        }
      } else return null;
    },
    async set(value) {
      let setValue: number | string | undefined = undefined;

      if (isNumberArray(value)) {
        setValue = value.join(urlSeparator);
      } else if (isStringArray(value)) {
        setValue = value.join(urlSeparator);
      }

      await router.push({
        query: {
          ...router.currentRoute.value.query,
          [key]: setValue,
        },
      });
    },
  });

  return { param };
}
