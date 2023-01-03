import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProductSearchPage from '@/views/ProductSearchPage.vue';
import CartPage from '@/views/CartPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'product-search' },
    },
    {
      path: '/product',
      name: 'product-search',
      component: ProductSearchPage,
    },
    {
      path: '/cart',
      component: CartPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: HomePage,
    },
  ],
  strict: true,
});

export default router;
