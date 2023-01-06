<script setup lang="ts">
import { useProductsRepo } from '@/store';
import ProductListItem from './ProductListItem.vue';
import ProductCardItem from './ProductCardItem.vue';
import { ViewType } from '@/composables';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  viewType: ViewType;
}>();

const { productsFiltered, isLoading } = storeToRefs(useProductsRepo());
</script>

<template>
  <AppSpinner v-if="isLoading" />
  <div v-else-if="productsFiltered.length === 0" class="product-list product-list_not-found">No products found</div>
  <div v-else-if="viewType === ViewType.List" class="product-list">
    <ProductListItem
      class="product-list__item"
      v-for="product in productsFiltered"
      :key="product.id"
      :product="product"
    />
  </div>
  <div v-else class="product-list">
    <ProductCardItem
      class="product-list__item"
      v-for="product in productsFiltered"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped lang="scss">
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;

  &__item {
    margin: 20px;
  }

  &_not-found {
    min-height: 60%;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
  }
}
</style>
