<template>
  <section class="container">
    <section class="cart" v-if="cart.length > 0">
      <page-crumbs class="cart__crumbs" :crumbs="crumbs" />
      <section class="cart__info">
        <cart-pagination />
        <transition-group class="products" name="products-anime" tag="ul">
          <cart-product
            class="product-anime"
            v-for="(item, index) in pageProducts"
            :item="item"
            :index="index"
            :key="item.product.id"
          >
            <span> {{ index + startIndex }} </span>
          </cart-product>
        </transition-group>
      </section>
      <cart-summary />
    </section>
    <section class="empty" v-else>
      <h3 class="empty__header">Cart is empty</h3>
      <p class="empty__info">Look at the main page to select products or find what you need in the search</p>
      <AppButton class="empty__go-main" @click="router.push({ name: 'overview' })">Main</AppButton>
    </section>
    <modal-window />
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useCart, usePagination } from '@/store';
import { CartPagination, CartProduct, CartSummary } from '@/components/cart/_index';
import PageCrumbs from '@/components/PageCrumbs.vue';
import ModalWindow from '@/components/modal/ModalWindow.vue';

const { pageProducts, startIndex } = storeToRefs(usePagination());
const { cart } = storeToRefs(useCart());
const crumbs = [{ id: 1, way: 'Cart' }];

</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.container {
  flex-grow: 1;
  margin: 0 auto;
  padding: 0 40px;
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
    background-color: $white;
    border-radius: 10px;
    @include apply-shadow;
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
