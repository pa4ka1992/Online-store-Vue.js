<template>
  <section class="cart container" v-if="cartStore.cart.length > 0">
      <section class="cart-info">
        <cart-pagination />
        <div class="products-in-cart">
          <div class="products">
            <cart-product
            v-for="product in cartStore.pageProducts"
            :product="product"
            :key="product.id"
             />
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
import CartProduct from '@/views/cart/CartProduct.vue';
import CartSummary from '@/views/cart/CartSummary.vue';

const cartStore = useCartStore();
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.container {
  max-width: $xxl;
  margin: 0 auto;
  padding: 0 10px;
  font-family: 'Poppins', sans-serif;
}
.cart {
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 1rem;
  position: relative;

  .cart-info {
    padding: 1rem;
    @include block-style;
  }

  .products {
    display: grid;
    flex-direction: column;
    align-self: center;
    gap: 0.5rem;
  }
}
</style>
