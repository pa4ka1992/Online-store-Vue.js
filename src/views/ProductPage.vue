<template>
  <section class="product container">
    <product-header :product="product" />
    <section class="product__content">
      <product-images :product="product" />
      <product-info :product="product" />
      <product-price :product="product" />
    </section>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ProductHeader from '@/components/product/ProductHeader.vue';
import ProductImages from '@/components/product/ProductImages.vue';
import ProductInfo from '@/components/product/ProductInfo.vue';
import ProductPrice from '@/components/product/ProductPrice.vue';

const props = defineProps<{
  id: Required<number>;
}>();

const product = ref({
  brand: 'Apple',
  category: 'smartphones',
  description: 'An apple mobile which is nothing like apple',
  discountPercentage: 12.96,
  id: '1',
  images: [
    'https://i.dummyjson.com/data/products/12/1.jpg',
    'https://i.dummyjson.com/data/products/12/2.jpg',
    'https://i.dummyjson.com/data/products/12/3.png',
    'https://i.dummyjson.com/data/products/12/4.jpg',
  ],
  price: 549,
  rating: 4.69,
  stock: 94,
  thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  title: 'iPhone 9',
});

// onBeforeMount(() => {
//   const productsStore = useProductsStore();
//   const { getProductById } = productsStore;
//   product = ref(getProductById(10));
// });
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.container {
  max-width: $xxl;
  margin: 0 auto;
  padding: 0 10px;
  font-family: 'Poppins', sans-serif;
}

.product {
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    justify-content: center;
  }

  &__price {
    @include block-style;
  }
}
</style>
