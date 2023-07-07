import { useRouter, LocationQueryRaw } from 'vue-router';

export function useResetQuery(ignoreKeys: string[]) {
  const { push, currentRoute } = useRouter();

  function resetQuery() {
    push({
      query: ignoreKeys.reduce((acc: LocationQueryRaw, value) => {
        acc[value] = currentRoute.value.query[value];
        return acc;
      }, {}),
    });
  }

  return {
    resetQuery,
  };
}
