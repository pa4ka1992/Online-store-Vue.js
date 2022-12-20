<template>
  <div class="product__price">
    <div class="product__price--full" :class="{ crossed: product['discountPercentage'] }">{{ countPrice }} $</div>
    <div v-if="discountPercentage" class="product__price--discount">Discount: {{ discountPercentage }}%</div>
    <div v-if="discountPercentage" class="product__price--final">{{ fixPrice }} $</div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ICartProduct } from '@/services/model/product';

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
    font-style: italic;
  }

  &--discount {
    font-weight: 600;
    color: $success;
  }

  &--final {
    font-weight: 600;
  }

  .crossed {
    text-decoration: line-through;
    font-weight: 400;
    color: $secondary;
  }
}
</style>
