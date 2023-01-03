<template>
  <li
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    class="product">
    <slot></slot>
    <img class="product__image" :src="images[0]" alt="product" />
    <product-info :product="product" />
    <product-count-info :product="product" :isHovered="isHovered"/>
    <product-price :product="product" />
  </li>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { ICartProduct } from '@/store/cart/types';
import ProductInfo from '@/components/cart/product/ProductInfo.vue';
import ProductCountInfo from '@/components/cart/product/ProductCountInfo.vue';
import ProductPrice from '@/components/cart/product/ProductPrice.vue';

const props = defineProps<{
  product: ICartProduct;
}>();

const { images } = toRefs(props.product);
const isHovered = ref(false);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.product {
  display: grid;
  grid-template-columns: 0.2fr 10rem 3fr 1.5fr 0.8fr;
  place-items: center center;
  gap: 0.5rem;
  padding: 1rem 0;
  font-family: "Nunito", sans-serif;

  &__image {
    display: block;
    max-width: 10rem;
    max-height: 10rem;
    border-radius: 5px;
  }
}
</style>
