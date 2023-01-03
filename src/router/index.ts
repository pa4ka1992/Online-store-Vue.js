import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProductSearchPage from '@/views/ProductSearchPage.vue';
import CartPage from '@/views/CartPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'product' }
    },
    {
      path: '/product',
      name: 'product',
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
