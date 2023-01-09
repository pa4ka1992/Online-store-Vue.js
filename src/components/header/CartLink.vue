<script lang="ts" setup>
import { RouteNames } from '@/router';
import { useCart, usePromo, usePagination } from '@/store';
import { storeToRefs } from 'pinia';
import { watch, ref, onUpdated } from 'vue';

const { cart } = storeToRefs(useCart());
const { totalPrice } = storeToRefs(usePromo());
const { page, limit } = storeToRefs(usePagination());

const iconAnimClass = ref('');
const countAnimClass = ref('');

watch(cart, (val, old) => {
  if (val.length > old.length) {
    iconAnimClass.value = 'play-cart-anim';
  }
  countAnimClass.value = 'cart-info__count_ping'
});

onUpdated(() => {
  if (iconAnimClass.value.length !== 0)
    setTimeout(() => {
      iconAnimClass.value = '';
    }, 300);
  if (countAnimClass.value.length !== 0)
    setTimeout(() => {
      countAnimClass.value = '';
    }, 300);
})

</script>

<template>
  <div class="cart-info">
    <RouterLink
      class="a cart-info__link"
      :to="{ name: RouteNames.cart, query: { limit: `${limit}`, page: `${page}` } }"
    >
      <i :class="iconAnimClass" class="icon-cart cart-info__icon"></i>
    </RouterLink>
    <span v-if="cart.length !== 0" class="cart-info__count" :class="countAnimClass">
      {{ cart.length }}
    </span>
    <span v-if="cart.length !== 0" class="cart-info__total"> ${{ totalPrice.toFixed(2) }} </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

$count-color: $warning;
$total-color: $success-light;

@keyframes ping {
  0% {
    translate: 44% -33%;
  }

  50% {
    translate: 44% -60%;
  }

  100% {
    translate: 44% -33%;
  }
}

.cart-info {
  position: relative;
  margin-top: 5px;
  width: 55px;
  height: 55px;
  color: $black;
  font-size: 1rem;

  &__link {
    transition: background-color 0.5s;
    background-color: $primary2;
    border-radius: 50%;
    @include apply-shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    scale: 1;
    transition: scale 0.2s;
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

    &_ping {
      animation: ping 0.3s cubic-bezier(0.46,-0.42, 0.63, 1.57);
    }
  }

  &__total {
    color: $white;
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
      scale: 0.9;
    }
  }
}
</style>
