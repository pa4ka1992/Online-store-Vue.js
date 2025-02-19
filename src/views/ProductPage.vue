<template>
  <section class="product__wrapper">
    <section v-if="isLoaded && product !== undefined" class="product container">
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
    <section v-else class="product__wrapper product__wrapper--loading">
      <AppSpinner />
    </section>
  </section>
  
</template>

<script lang="ts" setup>
import { ref, type Ref, watch, onBeforeMount } from 'vue';
import { useProducts } from '@/store';
import { ProductHeader, ProductImages, ProductInfo, ProductPrice } from '@/components/product/index';
import PageCrumbs from '@/components/PageCrumbs.vue';
import { IProduct } from '@/services';
import { ICrumbs } from '@/components/_types';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/router';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  id: IProduct['id']
}>()

const { isLoaded } = storeToRefs(useProducts());
const { getProductById } = useProducts();
const product = ref<IProduct>();
const crumbs: Ref<ICrumbs[]> = ref([]);

const router = useRouter();

const getProduct = () => {
  const currProduct = getProductById(props.id);
  if (currProduct) { 
    product.value = currProduct; 
    crumbs.value = [
      { id: 1, way: product.value.category },
      { id: 2, way: product.value.brand },
      { id: 3, way: product.value.title },
    ];
  } else router.replace({ name: RouteNames.notFound });
};

watch(isLoaded, (newIsLoaded) => {
  if (newIsLoaded) {
    getProduct();
  }
});

onBeforeMount(() => {
  if (isLoaded.value) {
    getProduct();
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.container {
  margin: 0 auto;
  flex-grow: 1;
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
      border-radius: 10px;
      background-color: $white;
      @include apply-shadow;
    }
  }
}
</style>
