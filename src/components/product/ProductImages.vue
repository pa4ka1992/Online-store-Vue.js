<template>
  <div class="product__img">
    <div class="product__img--slider">
      <img class="slider__img" :src="img" v-for="img in product.images" :key="img" alt="product" />
    </div>
    <div class="product__img--view">
      <img :src="product.images[0]" alt="product" />
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

.product__img {
  flex-basis: 40%;
  display: flex;

  &--slider {
    display: flex;
    flex-direction: column;

    .slider__img {
      max-width: 150px;
    }
  }
}
</style>
