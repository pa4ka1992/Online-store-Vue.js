<template>
  <div class="pagination">
    <h3 class="pagination__header">Products in cart</h3>
    <div class="select-group">
      <h4 class="select-group__header">Product per page:</h4>
      <my-select
        class="select-group__select"
        :value="cartStore.limit"
        :options="cartStore.maxLimit"
        @update="updateSelect"
      ></my-select>
    </div>
    <div class="pages">
      <div class="pages__page btn btn-light" v-for="page in cartStore.totalPage" :key="page" @click="changePage(page)">
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store';

const cartStore = useCartStore();
const changePage = (currPage: number): void => {
  cartStore.page = currPage;
};
const updateSelect = (value: number) => {
  cartStore.limit = value;
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;

  padding: 0.5rem 0;
  width: 100%;

  &__header {
    margin: 0;
    font-size: 1.3rem;
  }
  .select-group {
    display: flex;
    align-items: center;

    &__header {
      font-size: 1rem;
      margin: 0;
      margin-right: 0.5rem;
    }

    &__select {
      max-width: 3rem;
      font-size: 1rem;
    }
  }

  .pages {
    display: flex;

    &__page {
      border: 1px solid $secondary;
    }
  }
}
</style>
