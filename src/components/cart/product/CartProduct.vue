<template>
  <li
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="product"
    :class="{ active: isHovered }">
    <slot></slot>

    <RouterLink :to="{ name: RouteNames.product, params: { id: `${id}` } }">
      <img class="product__image" :src="thumbnail" alt="product" />
    </RouterLink>
    <product-info :product="product" />
    <product-count-info :product="product" :isHovered="isHovered" />
    <product-price :product="product" />
  </li>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { RouteNames } from '@/router/names';
import { ICartProduct } from '@/store/cart/types';
import ProductInfo from '@/components/cart/product/ProductInfo.vue';
import ProductCountInfo from '@/components/cart/product/ProductCountInfo.vue';
import ProductPrice from '@/components/cart/product/ProductPrice.vue';

const props = defineProps<{
  product: ICartProduct;
}>();

const { id, thumbnail } = toRefs(props.product);
const isHovered = ref(false);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.product {
  display: grid;
  grid-template-columns: 0.2fr 10rem 3fr 1.2fr 1fr;
  place-items: center center;
  gap: 0.5rem;
  padding: 1rem 0;
  font-family: 'Nunito', sans-serif;
  transition: all 0.2s;

  &__image {
    display: block;
    max-width: 10rem;
    max-height: 10rem;
    border-radius: 5px;
    transition: all 0.3s;
    filter: brightness(100%);
    cursor: pointer;

    &:hover {
      filter: brightness(60%);
    }
  }
}

.active {
  background-color: $gray-100;
}
</style>
