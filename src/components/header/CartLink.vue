<script lang="ts" setup>

import { useCartStore } from '@/store';

const cart = useCartStore();

</script>

<template>
  <div class="cart-info">
    <RouterLink class="a cart-info__link" to="/cart">
      <i class="icon-cart"></i>
    </RouterLink>
    <span v-if="cart.cart.length !== 0" class="cart-info__count">
      {{cart.cart.length}}
    </span>
    <span v-if="cart.cart.length !== 0" class="cart-info__total">
      ${{cart.totalProducts}}
    </span>
  </div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss'; 

$count-color: #FF8A8A;
$total-color: #FB4A9B;

.cart-info {
  position: relative;
  width: 60px;
  height: 60px;
  font-size: 1rem;
  transition: scale 0.5s;

  &__link {
    color: $black;
    background-color: $primary2;
    border-radius: 50%;
    @include apply-shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    font-size: 2rem;

    &:visited {
      color: $black;
    }
  }

  &__count {
    color: $black;
    background-color: $count-color;
    padding: 0 10px;
    border-radius: 100px;
    translate: 25% -25%;
    right: 0;
    top: 0;
    position: absolute;
  }

  &__total {
    background-color: $total-color;
    padding: 0 10px;
    border-radius: 100px;
    translate: -50% 30%;
    rotate: 10deg;
    bottom: 0;
    left: 0;
    position: absolute;
  }

  &:hover {
    scale: 1.2;
  }

  &:active {
    scale: 0.9;
  }
}

</style>