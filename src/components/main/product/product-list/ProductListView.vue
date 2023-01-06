<script setup lang="ts">
import { useProductsRepo } from '@/store';
import ProductListItem from './ProductListItem.vue';
import ProductCardItem from './ProductCardItem.vue';
import { IProduct } from '@/services';
import { ViewType, useChunkLoader } from '@/composables';
import { storeToRefs } from 'pinia';
import { watch, nextTick } from 'vue';

const props = defineProps<{
  viewType: ViewType;
}>();

const { productsFiltered, isLoading } = storeToRefs(useProductsRepo());

const { array, chunkedArray, isEnd, load } = useChunkLoader<IProduct>(10);

watch(productsFiltered, () => {
  array.value = [...productsFiltered.value];
});

function loadCb(done: () => void) {
  load();
  nextTick(() => {
    done();
  }); 
}

</script>

<template>
  <AppSpinner v-if="isLoading" />
  <div v-else-if="productsFiltered.length === 0" class="product-list product-list_not-found">No products found</div>
  <AppInfiniteScroll
    v-else-if="viewType === ViewType.List"
    @load="loadCb"
    :disable="isEnd && !isLoading">
    <div class="product-list">
      <ProductListItem
        class="product-list__item"
        v-for="product in chunkedArray"
        :key="product.id"
        :product="product"
      />
    </div>
    
    <template #loading>
      <AppSpinner class="loading"/>
    </template>
  </AppInfiniteScroll>
  <AppInfiniteScroll 
    v-else
    @load="loadCb"
    :disable="isEnd && !isLoading">
    <div class="product-list">
      <ProductCardItem
        class="product-list__item"
        v-for="product in chunkedArray"
        :key="product.id"
        :product="product"
      />
    </div>
    <template #loading>
      <AppSpinner class="loading"/>
    </template>
  </AppInfiniteScroll>
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

.loading {
  width: 100%;
  height: 100px;
  display: block;
}
</style>
