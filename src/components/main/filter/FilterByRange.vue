<script lang="ts" setup>

import FilterDropdown from './FilterDropdown.vue';
import FilterRange from './FilterRange.vue';
import { TNumberFields } from '@/services';
import { parseCamelCase, isNumber } from '@/utils';
import { useFilterByRange } from '@/composables';

const props = defineProps<{
  keyOfProduct: keyof TNumberFields,
}>();

const { maxTotal, bounds, minTotal, applyBounds } = useFilterByRange(props.keyOfProduct);

function validateBounds(value: number | undefined) {
  return isNumber(value) && 
         value !== Number.POSITIVE_INFINITY && 
         value !== Number.NEGATIVE_INFINITY ? 
         Math.round(value * 100) / 100 : 
         '--';
}

</script>

<template>

<FilterDropdown :title="parseCamelCase(keyOfProduct)"> 
  <section class="filter-range"> 
    <FilterRange 
      v-model:left="bounds.lower" 
      v-model:right="bounds.upper" 
      :max="maxTotal" 
      :min="minTotal"
      @release="applyBounds"/>
    <div class="filter-range__values-wrap">
      <span class="filter-range__value">{{ validateBounds(bounds.lower) }}</span>
      <span class="filter-range__value">{{ validateBounds(bounds.upper) }}</span>
    </div>
  </section>
</FilterDropdown>

</template>

<style scoped lang="scss">

.filter-range {
  height: 100%;

  &__values-wrap {
    display: flex;
    justify-content: space-between;
  }

  &__value {
    user-select: none;
    font-size: 1rem;
  }
}

</style>