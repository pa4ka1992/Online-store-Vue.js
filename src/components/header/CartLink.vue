<script lang="ts" setup>
import { RouteNames } from '@/router';
import { useCartStore, usePromoStore, usePaginationStore } from '@/store';
import { storeToRefs } from 'pinia';

const { cart } = storeToRefs(useCartStore());
const { totalPrice } = storeToRefs(usePromoStore());
const { page, limit } = storeToRefs(usePaginationStore());
</script>

<template>
  <div class="cart-info">
    <RouterLink
      class="a cart-info__link"
      :to="{ name: RouteNames.cart, query: { limit: `${limit}`, page: `${page}` } }"
    >
      <i class="icon-cart"></i>
    </RouterLink>
    <span v-if="cart.length !== 0" class="cart-info__count">
      <MyNumber :fixed="0" :input="cart.length" />
    </span>
    <span class="cart-info__total" v-if="cart.length !== 0">
      $<MyNumber :fixed="2" :input="totalPrice" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

$count-color: #ff8a8a;
$total-color: #fb4a9b;

.cart-info {
  position: relative;
  margin-top: 5px;
  width: 50px;
  height: 50px;
  font-size: 0.9rem;

  &__link {
    color: $gray-500;
    background-color: $white;
    border-radius: 50%;
    @include apply-shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: all 0.3s;

    font-size: 1.7rem;

    &:visited {
      color: $dark;
    }
  }

  &__count {
    color: $black;
    background-color: $danger-light;
    padding: 0 10px;
    border-radius: 100px;
    translate: 44% -33%;
    right: 0;
    top: 0;
    position: absolute;
    transition: translate 0.5s;
  }

  &__total {
    color: $dark;
    background-color: $primary2-light;
    padding: 0 10px;
    border-radius: 100px;
    translate: -50% 30%;
    rotate: 10deg;
    transition: scale 0.2s, rotate 0.2s;
    bottom: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
  }

  &:hover {
    .cart-info__link {
      color: $primary-light;
    }

    .cart-info__total {
      rotate: 370deg;
      scale: 1.2;
    }
  }

  &:active {
    .cart-info__link {
      transform: scale(0.95);
    }
  }
}
</style>
