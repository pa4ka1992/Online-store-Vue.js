<template>
  <section class="cart container" v-if="cartStore.cart.length > 0">
    <section class="cart-info">
      <cart-pagination />
      <div class="products-in-cart">
        <ul class="products">
          <cart-product
            v-for="(product, index) in paginationStore.pageProducts"
            :product="product"
            :index="index"
            :key="product.id"
            ><span>{{ index + paginationStore.startIndex }}</span>
          </cart-product>
        </ul>
      </div>
    </section>
    <cart-summary />
  </section>
  <h3 class="empty" v-else>Cart is empty</h3>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store';
import { usePaginationStore } from '@/store';
import CartPagination from '@/components/cart/CartPagination.vue';
import CartProduct from '@/components/cart/CartProduct.vue';
import CartSummary from '@/components/cart/CartSummary.vue';

const cartStore = useCartStore();
const paginationStore = usePaginationStore();
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
    padding-left: 0;
    list-style-type: none;
  }
}
</style>
