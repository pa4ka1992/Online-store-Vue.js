<template>
  <div class="product">
    <img class="product__image" :src="images[0]" alt="product" />
    <product-info :product="product" />
    <product-count-info :product="product" />
    <product-price :product="product" />
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ICartProduct } from '@/services/model/product';
import ProductInfo from '@/views/cart/product/ProductInfo.vue';
import ProductCountInfo from '@/views/cart/product/ProductCountInfo.vue';
import ProductPrice from '@/views/cart/product/ProductPrice.vue';

const props = defineProps<{
  product: Required<ICartProduct>;
}>();

const { images } = toRefs(props.product);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.product {
  display: grid;
  grid-template-columns: 1fr 3fr repeat(2, 1fr);
  place-items: center center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid $secondary {
    radius: 5px;
  }

  &__image {
    display: block;
    max-width: 15rem;
  }
}
</style>
