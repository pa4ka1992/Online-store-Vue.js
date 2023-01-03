import { createRouter, createWebHistory } from 'vue-router';
import { RouteNames } from './names';
import HomePage from '@/views/HomePage.vue';
import ProductSearchPage from '@/views/ProductSearchPage.vue';
import CartPage from '@/views/CartPage.vue';

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
      path: '/cart',
      name: RouteNames.cart,
      component: CartPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: RouteNames.notFound,
      component: HomePage,
    },
  ],
  strict: true,
});

export default router;

export { 
  RouteNames 
};
