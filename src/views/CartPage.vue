<template>
  <section class="cart container" v-if="cart.length > 0">
    <page-crumbs class="cart__crumbs" :crumbs="crumbs" />
    <section class="cart__info">
      <cart-pagination />
      <transition-group class="products" name="products-anime" tag="ul">
        <cart-product
          class="product-anime"
          v-for="(product, index) in pageProducts"
          :product="product"
          :index="index"
          :key="product.id"
        >
          <span> {{ index + startIndex }} </span>
        </cart-product>
      </transition-group>
    </section>
    <cart-summary />
  </section>
  <section class="empty container" v-else>
    <h3 class="empty__header">Cart is empty</h3>
    <p class="empty__info">Look at the main page to select products or find what you need in the search</p>
    <my-button class="empty__go-main" @click="router.push('/')">Main</my-button>
  </section>
  <buy-modal />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useCartStore, usePaginationStore } from '@/store';
import CartPagination from '@/components/cart/CartPagination.vue';
import CartProduct from '@/components/cart/CartProduct.vue';
import CartSummary from '@/components/cart/CartSummary.vue';
import PageCrumbs from '@/components/PageCrumbs.vue';
import BuyModal from '@/components/modal/BuyModal.vue';

const { pageProducts, startIndex } = storeToRefs(usePaginationStore());
const { cart } = storeToRefs(useCartStore());
const crumbs = [{ id: 1, way: 'Cart' }];
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.container {
  max-width: $xxl;
  margin: 0 auto;
  padding: 0 10px;
  font-family: 'Poppins', sans-serif;
}

body {
  overflow: hidden;
}

.cart {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: repeat(2, fit-content);
  column-gap: 1rem;
  position: relative;
  user-select: none;

  &__crumbs {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }

  &__info {
    padding: 1rem;
    @include block-style;
  }

  .products {
    display: grid;
    flex-direction: column;
    align-self: center;
    gap: 0.5rem;
    position: relative;
    padding-left: 0;
  }
}

.empty {
  &__info {
    width: 30%;
    color: $secondary;
  }
}

.products-anime {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }

  &-leave-active {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
