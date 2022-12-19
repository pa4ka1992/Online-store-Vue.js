<template>
  <section v-if="cartStore.cart.length > 0">
    <cart-pagination />
    <div class="products-in-cart">
      <div class="products">
        <cart-product v-for="product in cartStore.pageProducts" :product="product" :key="product.id" />
      </div>
    </div>
    <cart-summary />
  </section>
  <h3 class="empty" v-else>Cart is empty</h3>
</template>

<script lang="ts" setup>
import { useCartStore } from '../../store';
import CartPagination from './CartPagination.vue';
import CartProduct from './CartProduct.vue';
import CartSummary from './CartSummary.vue';

const cartStore = useCartStore();
</script>
