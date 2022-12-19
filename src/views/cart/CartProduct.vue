<template>
  <div class="product">
    <img class="product__image" :src="product['images'][0]" alt="product" />
    <div class="product__info">
      <div class="product__info--header">
        <div class="header__rating">{{ product['rating'] }}</div>
        <div class="header__title">{{ product['title'] }}</div>
      </div>

      <div class="product__info--description">{{ product['description'] }}</div>
    </div>
    <div class="product__count-info">
      <div class="stock">{{ product['stock'] }}</div>
      <div class="count-control">
        <button class="increment" @click="cartStore.incrementCount(product as ICartProduct)">+</button>
        <span class="count">{{ product['count'] }}</span>
        <button class="decrement" @click="cartStore.decrementCount(product as ICartProduct)">-</button>
      </div>
      <div class="single-price">{{ product['price'] }}$/pc.</div>
    </div>
    <div class="product__price">
      <div class="product__price--full">{{ product['countPrice'] }}$</div>
      <div v-if="product['discountPercentage']" class="product__price--discount">Discount: {{ product['discountPercentage'] }}%</div>
      <div v-if="product['discountPercentage']" class="product__price--final">{{ }}</div>
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
  justify-content: space-between;
  gap: 0.5rem;

  padding: 0.5rem;

  border: 1px solid $secondary {
    radius: 5px;
  }

  &__image {
    display: block;
    max-width: 15rem;
  }

  &__info {
    flex-basis: 50%;

    text-align: left;

    &--header {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;

      .header__rating {
        font-weight: 600;

        color: $gold;
      }

      .header__title {
        font-weight: 600;

        color: $primary;
      }
    }
  }

  .count-info {
    flex-shrink: 0;
  }

  &__price {
    flex-shrink: 0;
  }
}
</style>
