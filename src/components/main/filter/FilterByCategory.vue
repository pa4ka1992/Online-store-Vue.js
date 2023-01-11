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
        <FilterCheckbox class="category" :model-value="category.checked" @update:model-value="toggleCategory(category.name)">
          <span class="category__name">{{category.name.trim()}} </span> 
          <span class="category__count">({{category.count}}/{{category.total}})</span>
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

.category {
  display: flex;
  justify-content: space-between;

  &__name {
    flex-grow: 1;
    max-width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__count {
    width: 40px;
    text-align: right;
  }
}

</style>
