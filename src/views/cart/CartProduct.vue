<template>
  <div class="product">
    <img class="image" :src="product['images'][0]" alt="product" />
    <div class="info">
      <div class="ttile">{{ product['title'] }}</div>
      <div class="description">{{ product['description'] }}</div>
      <div class="common-info">
        <div class="rating">{{ product['rating'] }}</div>
        <div class="discount">{{ product['discountPercentage'] }}</div>
      </div>
    </div>
    <div class="price-info">
      <div class="stock">{{ product['stock'] }}</div>
      <div class="count-control">
        <button class="increment" @click="cartStore.incrementCount(product as ICartProduct)">+</button>
        <span class="count">{{ product['count'] }}</span>
        <button class="decrement" @click="cartStore.decrementCount(product as ICartProduct)">-</button>
      </div>
      <div class="price">{{ product['countPrice'] }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useCartStore } from '@/store';
import { ICartProduct } from '@/services//model/product';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const cartStore = useCartStore();
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.product {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  gap: 0.5rem;

  padding: 0.5rem;

  border: 1px solid $secondary {
    radius: 5px;
  };


  .image {
    display: block;
    max-width: 15rem;

  }

  .info {
    flex-basis: 100%;
    text-align: left;
  }

  .price-info {
    flex-shrink: 0;
  }

}
</style>
