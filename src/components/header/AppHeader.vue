<script lang="ts" setup>
import SearchBar from './SearchBar.vue';
import CartLink from './CartLink.vue';

import { RouteNames } from '@/router';
import { useSearch } from '@/composables';

const { searchField, startSearch } = useSearch(['title', 'description', 'brand', 'price', 'stock', 'category']);

function click() {
  startSearch();
}

</script>

<template>
  <header class="page-header">
    <RouterLink class="a" :to="{ name: RouteNames.productSearch }">
      <div class="logo">Online Store</div>
    </RouterLink>
    <SearchBar @search="click" v-model="searchField" />
    <CartLink />
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 35px;
  background-color: $primary;
  color: $white;

  @include apply-shadow;
}

.logo {
  user-select: none;
  font-size: 2rem;
  font-family: 'Pacifico', cursive;
  transition: scale 0.5s;
  @include logo-style;

  &:hover {
    scale: 1.2;
  }
}
</style>
