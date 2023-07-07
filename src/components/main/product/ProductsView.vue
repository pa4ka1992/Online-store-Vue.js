<script lang="ts" setup>

import { useProductsRepo } from '@/store';
import { useProductView, ViewType } from '@/composables';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import SortOptionList from './SortOptionList.vue';
import { ProductListView } from './product-list';

const { productsFiltered, isLoading } = storeToRefs(useProductsRepo());
const { type } = useProductView();

function toggleGrid() {
  type.value = ViewType.Grid;
}

function toggleList() {
  type.value = ViewType.List;
}

const listClass = computed(() => {
  return type.value === ViewType.List ? 'view-options__btn_active' : '';
});

const gridClass = computed(() => {
  return type.value === ViewType.Grid ? 'view-options__btn_active' : '';
});

</script>

<template>
  <section class="product-section">
    <h1 class="product-section__heading">
      Products
      <span class="product-count">found {{ !isLoading ? productsFiltered.length : '--' }} products</span>
    </h1>
    <div class="product-section__options">
      <SortOptionList :sort-keys="['title', 'rating', 'price', 'stock']" />
      <div class="view-options">
        <button class="btn view-options__btn" :class="gridClass" @click="toggleGrid">
          <i class="icon-apps-sqr"></i>
        </button>
        <button class="btn view-options__btn" :class="listClass" @click="toggleList">
          <i class="icon-list-sqr"></i>
        </button>
      </div>
    </div>
    <ProductListView :viewType="type"/>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.product-count {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: $gray-600;
}

.view-options {
  &__btn {
    font-size: 2.5rem;
    transition: color 0.25s;

    &_active {
      color: $primary;
    }

    &:hover {
      color: $primary;
      transform: scale(1.05);
    }
  }
}

.product-section {
  width: 100%;
  padding: 10px 40px;
  padding-right: 0;
  display: flex;
  flex-direction: column;

  &__heading {
    font-family: 'Pacifico', cursive;
    font-size: 2rem;
    font-weight: normal;
    margin: 0;
    margin-bottom: 10px;
    user-select: none;
  }

  &__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>