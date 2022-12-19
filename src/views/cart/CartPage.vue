<template>
  <section class="cart container" v-if="cartStore.cart.length > 0">
      <section class="cart-info">
        <cart-pagination />
        <div class="products-in-cart">
          <div class="products">
            <cart-product v-for="product in cartStore.pageProducts" :product="product" :key="product.id" />
          </div>
        </div>
      </section>
      <cart-summary />
  </section>
  <h3 class="empty" v-else>Cart is empty</h3>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store';
import CartPagination from '@/views/cart/CartPagination.vue';
import CartProduct from '@/views/cart//CartProduct.vue';
import CartSummary from '@/views/cart//CartSummary.vue';

const cartStore = useCartStore();
</script>
<style lang="scss" scoped>
.cart {
  display: flex;
  gap: 1rem;
  .products {
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 0.5rem;
  }
}
</style>
