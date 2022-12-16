import { createPinia } from 'pinia';

export function usePinia() {
  const pinia = createPinia();
  return pinia;
}
