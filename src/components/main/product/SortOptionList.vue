<script setup lang="ts">

import { TProductKeys } from '@/services';
import { useSortOptionList } from '@/composables';
import SortOption from './SortOption.vue';
import { ref } from 'vue';

const props = defineProps<{
  sortKeys: TProductKeys[],
}>();

const value = useSortOptionList(props.sortKeys);
const queryKey = ref(value);

</script>

<template>
<section class="sort-option-list">
  <h4 class="sort-option-list__heading">Sort by:</h4>
  <div v-for="sortKey in sortKeys" class="sort-option-list__item" :key="sortKey">
    <SortOption :product-key="sortKey" :query-key="queryKey"/>
  </div>
</section>
</template>

<style lang="scss" scoped>

.sort-option-list {
  display: flex;
  align-items: center;

  &__heading {
    margin: 5px;
    font-size: 1.2rem;
    margin-right: 10px; 
  }

  &__item {
    padding: 10px;
  }
}

</style>