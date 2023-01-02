<template>
  <div class="product__info">
    <div class="product__info--header">
      <span class="header__brand">{{ product.brand }}</span>
      <span class="header__category">{{ product.category }}</span>
    </div>
    <div class="product__info--description">
      <p class="description__text">
        {{ product.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from '@/services';
import { toRefs } from 'vue';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = toRefs(props);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.product__info {
  flex-basis: 40%;
}


</style>
