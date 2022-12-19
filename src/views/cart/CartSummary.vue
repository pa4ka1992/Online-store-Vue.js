<template>
    <form @submit.prevent class="summary">
      <h3 class="header">Summary</h3>
      <div class="total-products">
        <span class="total-header">Products</span>
        <span class="total-count">{{ cartStore.totalProducts }}</span>
      </div>
      <div class="total-price">
        <span class="total-header">Total</span>
        <span class="total-money">{{ cartStore.totalPrice }}</span>
        <div class="total-discount" v-show="cartStore.isDiscounted">
          <span class="discount-header">Total with discount</span>
          <span class="total-discount" >{{ cartStore.getPromoPrice }} </span>
        </div>
      </div>
      <input type="text" class="promo" v-model="cartStore.promo" />
      <button class="buy">Buy now</button>
    </form>
</template>

<script lang="ts" setup>
import { useCartStore } from '../../store';

const cartStore = useCartStore();
</script>
