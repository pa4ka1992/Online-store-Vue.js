<template>
  <section
  class="cart container"
  v-if="cart.length > 0">
    <section class="cart__info">
      <cart-pagination />
      <transition-group class="products" name="products-anime" tag="ul">
        <cart-product
          class="product-anime"
          v-for="(product, index) in pageProducts"
          :product="product"
          :index="index"
          :key="product.id">
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
  <transition-group name="modal-anime">
    <buy-modal v-if="modalIsShow" />
  </transition-group>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useCartStore, usePaginationStore, useModalStore } from '@/store';
import CartPagination from '@/components/cart/CartPagination.vue';
import CartProduct from '@/components/cart/CartProduct.vue';
import CartSummary from '@/components/cart/CartSummary.vue';
import BuyModal from '@/components/modal/BuyModal.vue';

const { pageProducts, startIndex } = storeToRefs(usePaginationStore());
const { cart } = storeToRefs(useCartStore());
const { modalIsShow } = storeToRefs(useModalStore());
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
  column-gap: 1rem;
  position: relative;

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

.products-anime-move,
.products-anime-enter-active,
.products-anime-leave-active {
  transition: all 0.3s ease;
}

.products-anime-enter-from,
.products-anime-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.products-anime-leave-active {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.modal-anime-enter-active,
.modal-anime-leave-active {
  transition: all 0.3s ease;
}

.modal-anime-enter-from,
.modal-anime-leave-to {
  opacity: 0;
  transform: scale(0);
}

.modal-anime-leave-active {
  transform: scale(0);
}
</style>
