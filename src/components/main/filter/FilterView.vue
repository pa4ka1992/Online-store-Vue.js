<script lang="ts" setup>

import FilterByCategory from './FilterByCategory.vue';
import FilterByRange from './FilterByRange.vue';

import { ref } from 'vue';
import { useResetQuery, viewQueryKey, sortQueryKey } from '@/composables';

  const ignoreParams = [viewQueryKey, sortQueryKey];

const { resetQuery } = useResetQuery(ignoreParams);
const copied = ref(false);

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copied.value = true;
    setTimeout(() =>  copied.value = false, 1500);
  });
}

</script>

<template>

<section class="filter-section">
  <h1 class="filter-section__heading">Filters</h1>
  <button class="btn filter-section__btn filter-section__btn_type_copy" @click="copyLink">
    <FadeTransition>
      <span v-if="copied">Copied!</span>
      <span v-else>Copy Link</span>
    </FadeTransition>
  </button>
  <button class="btn filter-section__btn filter-section__btn_type_reset" @click="resetQuery">
    Reset filters
  </button>
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
</section>

</template>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss';

.filter-section {
  background-color: $primary-light;
  color: $white;
  top: 1rem;
  max-width: 380px;
  padding: 10px 30px;
  margin: 0 20px;
  height: fit-content;
  border-radius: 20px;
  @include apply-shadow;

  &__heading {
    font-family: 'Pacifico', cursive;
    font-size: 2rem;
    font-weight: normal;
    margin: 0;
    margin-bottom: 10px;
    user-select: none;
    text-shadow: 0px 2px 2px #000;
    @include logo-style;
  }

  &__filter-option {
    margin: 10px 0;
  }

  &__btn {
    border-radius: 20px;
    margin: 15px 0;
    font-size: 1rem;
    padding: 5px;
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

    &_type_reset {
      background-color: $danger;
      color: $white;
    }

    &_type_copy {
      background-color: $success;
      color: $white;
    }
  }
}

</style>