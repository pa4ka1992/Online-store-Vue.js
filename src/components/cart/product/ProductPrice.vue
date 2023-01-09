<template>
  <div class="product__price">
    <div class="product__price--full" :class="{ crossed: product['discountPercentage'] }">
      <MyNumber :input="product.actualPrice * item.count" :fixed="2" /> $
    </div>
    <span v-if="product.discountPercentage" class="product__price--discount"> Sale: {{ product.discountPercentage }}% </span>
    <div v-if="product.discountPercentage" class="product__price--final">
      <MyNumber :input="item.countPrice" :fixed="2" /> $
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, reactive } from 'vue';
import { ICartItem } from '@/store/cart/types';

const props = defineProps<{
  item: ICartItem;
}>();

const { item } = reactive(props);
const { product } = toRefs(item);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

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
