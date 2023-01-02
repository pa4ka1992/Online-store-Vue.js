<template>
  <div class="wrapper">
    <div class="product__prices">
      <span class="product__price--full">{{ product.price }} $</span>
      <span class="product__price--fix">{{ getFixPrice().toFixed(0) }} $</span>
    </div>
    <my-button>Add to cart</my-button>
    <my-button>Buy</my-button>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from '@/services';
import { toRefs } from 'vue';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = toRefs(props);

const getFixPrice = () => {
  return product.value.price * (1 - product.value.discountPercentage / 100);
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.product__price {
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  @include block-style;
}
</style>
