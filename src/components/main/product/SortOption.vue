<script setup lang="ts">
import { SortType, TProductKeys } from '@/services';
import { useSortOption } from '@/composables';
import { parseCamelCase } from '@/utils';
import { computed } from 'vue';

const props = defineProps<{
  productKey: TProductKeys;
  queryKey: string;
}>();

const { sortUsage } = useSortOption(props.productKey, props.queryKey);

const iconClass = computed(() => {
  return sortUsage.value ? `sort-option__icon_type_${sortUsage.value}` : '';
});

function toggleSort() {
  sortUsage.value = sortUsage.value === SortType.ascending ? SortType.descending : SortType.ascending;
}
</script>

<template>
  <button class="btn sort-option" @click="toggleSort">
    <i class="icon-sort sort-option__icon" :class="iconClass"></i>
    <h5 class="sort-option__name">{{ parseCamelCase(productKey) }}</h5>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.sort-option {
  padding: 10px 20px;
  background-color: $primary;
  color: $white;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;

  display: flex;
  align-items: center;

  transition: background-color 0.5s;

  &:hover {
    background-color: $primary-dark;
  }

  &__icon {
    font-size: 1rem;
    margin-right: 5px;

    &::before {
      overflow: hidden;
      width: auto;
      max-width: 0;
      transition: max-width 0.25s, rotate 0.25s;
      margin: 0;

      rotate: 180deg;
    }

    &_type_desc {
      &::before {
        display: block;
        max-width: 35px;
        rotate: 0deg;
      }
    }

    &_type_asc {
      &::before {
        display: block;
        max-width: 35px;
      }
    }
  }

  &__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
  }
}
</style>
