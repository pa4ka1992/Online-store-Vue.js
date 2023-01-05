<template>
  <section v-if="isLoaded" class="product container">
    <page-crumbs :crumbs="crumbs" />
    <product-header :product="product" />
    <section class="product__content">
      <div class="content__wrapper">
        <product-images :product="product" />
        <product-info :product="product" />
      </div>
      <product-price :product="product" />
    </section>
  </section>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useProductsStore } from '@/store';
import { ProductHeader, ProductImages, ProductInfo, ProductPrice } from '@/components/product/index';
import PageCrumbs from '@/components/PageCrumbs.vue';
import { IProduct } from '@/services';
import { ICrumbs } from '@/components/types';

const props = defineProps<{
  id: Required<IProduct['id']>;
}>();

const productsStore = useProductsStore();
const { getProductById, isLoaded } = productsStore;
const product = ref({} as IProduct);
const crumbs: Ref<ICrumbs[]> = ref([]);

const getProduct = () => {
  const currProduct = getProductById(props.id);
  if (currProduct) product.value = currProduct;
  crumbs.value = [
    { id: 1, way: product.value.category },
    { id: 2, way: product.value.brand },
    { id: 3, way: product.value.title },
  ];
};

getProduct();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.container {
  margin: 0 auto;
  padding: 0 40px;
  font-family: 'Poppins', sans-serif;
}

.product {
  display: flex;
  flex-direction: column;
  user-select: none;

  &__content {
    display: flex;
    justify-content: center;
    gap: 1rem;
    position: relative;

    .content__wrapper {
      flex-basis: 80%;
      display: flex;
      gap: 1rem;
      padding: 1rem;
      font-family: 'Nunito', sans-serif;
      @include block-style;
    }
  }
}
</style>
