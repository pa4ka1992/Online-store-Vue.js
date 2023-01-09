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
    <div class="product-list product-list_type_list">
      <ProductListItem
        class="product-list__item product-list__item_type_list"
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
    <div class="product-list product-list_type_grid">
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
  width: 100%;

  &_not-found {
    min-height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
  }

  &_type_grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    row-gap: 1.5rem;
    column-gap: 1rem;
    place-items: center center;
  }

  &_type_list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    margin-top: 15px;

    &_type_list {
      margin: 20px;
    }
  }
}

.loading {
  width: 100%;
  height: 100px;
  display: block;
}
</style>
