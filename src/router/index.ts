import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CartPage from '@/views/CartPage.vue';
import ProductPage from '@/views/ProductPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: HomePage,
    },
    {
      path: '/cart',
      component: CartPage,
    },
    {
      path: '/product/:name/id/:id',
      component: ProductPage,
      props: true,
    },
  ],
  strict: true,
});

export default router;
