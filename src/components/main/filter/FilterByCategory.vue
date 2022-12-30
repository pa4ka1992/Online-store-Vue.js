<script lang="ts" setup>
import FilterDropdown from './FilterDropdown.vue';
import FilterCheckbox from './FilterCheckbox.vue';
import { TStringFields } from '@/services';
import { parseCamelCase } from '@/utils';
import { useFilterByCategory } from '@/composables';

const props = defineProps<{
  keyOfProduct: keyof TStringFields;
}>();

const { categories, toggleCategory } = useFilterByCategory(props.keyOfProduct);
</script>

<template>
  <FilterDropdown :title="parseCamelCase(keyOfProduct)">
    <section class="filter-categories-list">
      <div v-for="category in categories" class="filter-categories-list__item" :key="category.name">
        <FilterCheckbox :model-value="category.checked" @update:model-value="toggleCategory(category.name)">
          <span class="category-name">{{category.name}} </span> ({{category.count}})
        </FilterCheckbox>
      </div>
    </section>
  </FilterDropdown>
</template>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss';

.filter-categories-list {
  height: 100%;

  &__item {
    margin: 8px 0;
  }
}

.category-name {
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
