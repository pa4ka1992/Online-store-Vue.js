import { createPinia } from 'pinia';
import cloneDeep from 'lodash.clonedeep';

export function usePinia() {
  const store = createPinia();

  store.use(({ store }) => {
    const initialState = cloneDeep(store.$state)
    store.$reset = () => store.$patch(cloneDeep(initialState))
  })
  return store;
}
