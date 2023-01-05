<script lang="ts" setup>

import { useProductsStore } from '@/store';
import { useProductView, ViewType } from '@/composables';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import SortOptionList from './SortOptionList.vue';
import { ProductCardItem, ProductListItem } from './product-item';

const { products } = storeToRefs(useProductsStore());
const { type } = useProductView();

const gridClass = computed(() => {
  return type.value === ViewType.Grid ? 'view-options__btn_active' : '';
});

function toggleGrid() {
  type.value = ViewType.Grid;
}

const listClass = computed(() => {
  return type.value === ViewType.List ? 'view-options__btn_active' : '';
});

function toggleList() {
  type.value = ViewType.List;
}

</script>

<template>
  <section class="product-section">
    <h1 class="product-section__heading">
      Products 
      <span class="product-count">found {{ products.length }} products</span>
    </h1>
    <div class="product-section__options"> 
      <SortOptionList :sort-keys="['title', 'rating', 'price', 'stock']"/>
      <div class="view-options">
        <button class="btn view-options__btn" :class="gridClass" @click="toggleGrid">
          <i class="icon-apps-sqr"></i>
        </button>
        <button class="btn view-options__btn" :class="listClass" @click="toggleList">
          <i class="icon-list-sqr"></i>
        </button>
      </div>
    </div>
    <div v-if="products.length === 0" class="product-list product-list_not-found">
      No products found 
    </div>
    <div v-else-if="type === ViewType.List" class="product-list">
      <div class="product-list__item product-list__item_type_list" v-for="product in products" :key="product.id">
        <ProductListItem :product="product"/>
      </div>
    </div>
    <div v-else class="product-list">
      <div class="product-list__item" v-for="product in products" :key="product.id">
        <ProductCardItem :product="product"/>
      </div>
    </div>
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
      color: $primary-light;
    }
  }
}

.product-section {
  width: 100%;
  padding: 10px 40px;
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

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;

  &__item {
    padding: 20px;
  }

  &__item_type_list {
    width: 100%;
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