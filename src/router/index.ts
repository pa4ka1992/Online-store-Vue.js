import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CartPage from '@/views/CartPage.vue';

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
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: HomePage,
    },
  ],
  strict: true,
});

export default router;
