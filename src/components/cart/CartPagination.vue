<template>
  <section class="pagination">
    <h3 class="pagination__header">
      Cart
      <span class="pagination__total-products">
        {{ totalProducts }}
      </span>
    </h3>
    <div class="select-group">
      <h4 class="select-group__header">Product per page:</h4>
      <MySelect class="select-group__select" :limit="limit" :maxLimit="maxLimit" @update="updateLimit"></MySelect>
    </div>
    <my-paginate
      v-model="page"
      :page-count="totalPage"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pages'"
      :page-class="'page'"
      :next-class="'page arrow'"
      :prev-class="'page arrow'"
      :break-view-class="'break'"
    />
  </section>
</template>

<script lang="ts" setup>
import { usePaginationStore } from '@/store';
import { useCartStore } from '@/store';
import { storeToRefs } from 'pinia';
import Paginate from 'vuejs-paginate-next';
import { maxLimit } from '@/store/cart/constants';

const { totalProducts } = storeToRefs(useCartStore());
const { limit, page, totalPage } = storeToRefs(usePaginationStore());
const { updateLimit } = usePaginationStore();
const MyPaginate = Paginate;
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.pagination {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 4fr 2fr;
  padding: 0.5rem 0;
  width: 100%;
  position: sticky;
  top: 66px;
  border-bottom: 1px solid $secondary;
  background-color: $white;
  z-index: 5;

  &__header {
    margin: 0;
    font: {
      family: 'Pacifico', cursive;
      size: 2rem;
    }
  }
  .select-group {
    justify-self: end;
    display: flex;
    align-items: center;

    &__header {
      font-size: 1rem;
      margin: 0;
      margin-right: 0.5rem;
    }

    &__select {
      max-width: 5rem;
    }
  }

  &__total-products {
    position: relative;
    bottom: 0.5rem;
    font-size: 0.7em;
  }

  .pages {
    justify-self: end;
    display: flex;
    justify-content: flex-end;
    gap: 0.3rem;
    list-style: none;
    min-width: 375px;

    :deep(.page) {
      padding: 0.3rem 0.2rem;
      min-width: 2rem;
      background-color: $white;
      border: {
        radius: 10px;
      }
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      @include block-style;

      &:hover {
        color: $light;
        background-color: $primary-dark;
      }
    }

    :deep(.page-link) {
      display: block;
      text-align: center;
    }

    :deep(.disabled) {
      color: $secondary;
      border-color: $secondary;

      &:hover {
        color: $secondary;
        background-color: $light;
      }
    }

    :deep(.active) {
      color: $white;
      background-color: $primary;
    }
  }
}
</style>
