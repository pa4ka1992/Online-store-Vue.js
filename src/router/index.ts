import { createRouter, createWebHistory } from 'vue-router';
import { RouteNames } from './names';
import NotFoundPage from '@/views/NotFoundPage.vue';
import ProductSearchPage from '@/views/ProductSearchPage.vue';
import CartPage from '@/views/CartPage.vue';
import ProductPage from '@/views/ProductPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: RouteNames.landing,
      redirect: { name: 'product-search' },
    },
    {
      path: '/product',
      name: RouteNames.productSearch,
      component: ProductSearchPage,
    },
    {
      path: '/product/:id',
      name: RouteNames.product,
      component: ProductPage,
      props: (route) => ({ id: route.params['id'] }),
    },
    {
      path: '/cart',
      name: RouteNames.cart,
      component: CartPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: RouteNames.notFound,
      component: NotFoundPage,
    },
  ],
  strict: true,
});

export default router;

export { RouteNames };
