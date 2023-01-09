<template>
  <div class="product__price">
    <div class="product__price--full" :class="{ crossed: product['discountPercentage'] }">
      $<AppNumber :input="product.countPrice" :fixed="2" />
    </div>
    <span v-if="discountPercentage" class="product__price--discount"> Sale: {{ discountPercentage }}% </span>
    <div v-if="discountPercentage" class="product__price--final">
      $<AppNumber :input="product.fixPrice" :fixed="2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, reactive } from 'vue';
import { ICartProduct } from '@/store/cart/_types';

const props = defineProps<{
  product: Required<ICartProduct>;
}>();

const { product } = reactive(props);
const { discountPercentage } = toRefs(product);
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
