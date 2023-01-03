<template>
  <div class="product__price">
    <div
      class="product__price--full"
      :class="{ crossed: product['discountPercentage'] }">
      <my-number :input="countPrice" :fixed="2"/> $
    </div>
    <span
      v-if="discountPercentage"
      class="product__price--discount">
      Sale: {{ discountPercentage }}%
    </span>
    <div
      v-if="discountPercentage"
      class="product__price--final">
      <my-number :input="fixPrice" :fixed="2"/> $
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ICartProduct } from '@/store/cart/types';

const props = defineProps<{
  product: Required<ICartProduct>;
}>();

const { discountPercentage, countPrice, fixPrice } = toRefs(props.product);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.product__price {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &--full {
    font-weight: 600;
    font-size: 1.2rem;

  }

  &--discount {
    font-weight: 600;
    color: $success;
  }

  &--final {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .crossed {
    text-decoration: line-through;
    font-weight: 400;
    font-size: 1rem;
    font-style: italic;
    color: $secondary;
  }
}
</style>
