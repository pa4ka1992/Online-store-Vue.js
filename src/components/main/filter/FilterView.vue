<script lang="ts" setup>

import FilterByCategory from './FilterByCategory.vue';
import FilterByRange from './FilterByRange.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

function resetFilters() {
  router.push({ query: undefined });
}

</script>

<template>

<section class="filter-section">
  <h1 class="filter-section__heading">Filters</h1>
  <div class="filter-section__filter-option">
    <FilterByRange key-of-product="price"/>
  </div>
  <div class="filter-section__filter-option">
    <FilterByRange key-of-product="stock"/>
  </div>
  <div class="filter-section__filter-option">
    <FilterByCategory key-of-product="category"/>
  </div>
  <div class="filter-section__filter-option">
    <FilterByCategory key-of-product="brand"/>
  </div>
  <button class="btn filter-section__reset-btn" @click="resetFilters">
    Reset filters
  </button>
</section>

</template>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss';

.filter-section {
  background-color: $primary;
  color: $white;
  min-height: 100%;
  max-width: 380px;
  padding: 10px 40px;
  display: table-cell;
  border-radius: 30px;
  margin: 0 20px;

  &__heading {
    font-family: 'Pacifico', cursive;
    font-size: 2rem;
    font-weight: normal;
    margin: 0;
    margin-bottom: 10px;
    user-select: none;
  }

  &__filter-option {
    margin: 10px 0; 
  }

  &__reset-btn {
    background-color: $danger;
    border-radius: 20px;
    margin: 20px 0;
    font-size: 1rem;
    padding: 5px;
    color: $white;
    width: 100%;
    display: block;
    font-family: 'Poppins', sans-serif;
    transition: filter 0.5s;

    &:hover {
      filter: saturate(150%);
    }

    &:active {
      filter: saturate(70%);
    }
  }
}

</style>