<script lang="ts" setup>

import { FilterView, ProductView } from '@/components/main';

</script>

<template>
  <div class="product-search-page">
    <ProductView/>
    <FilterView/>
  </div>
  
</template>

<style lang="scss" scoped>

.product-search-page {
  display: flex;
  width: 100%;
  min-height: 100%;
}

</style>