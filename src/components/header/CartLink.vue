<script lang="ts" setup>

import { useCartStore, usePromoStore } from '@/store';

const cart = useCartStore();
const promo = usePromoStore();

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
      ${{promo.totalPrice.toFixed(2)}}
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
    transition: background-color 0.5s;

    font-size: 1.7rem;

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
    transition: translate 0.5s;
  }

  &__total {
    background-color: $total-color;
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
      background-color: $primary2-light;
    }

    .cart-info__total { 
      rotate: 370deg;
      scale: 1.2;
    } 
  }

  &:active {
    .cart-info__link { 
      background-color: $primary2-dark;
    } 
  }
}

</style>