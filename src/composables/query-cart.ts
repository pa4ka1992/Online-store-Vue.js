import router from '@/router';
import { RouteNames } from '@/router/names';

export function useQueryCart(limit: number, page: number) {
  router.replace({ name: RouteNames.cart, query: { limit: `${limit}`, page: `${page}` } });
}
