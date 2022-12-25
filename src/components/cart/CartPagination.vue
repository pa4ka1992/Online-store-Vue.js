<template>
  <section class="pagination">
    <h3 class="pagination__header">
      Cart
      <span class="pagination__total-products">
        {{ cartStore.totalProducts }}
      </span>
    </h3>
    <div class="select-group">
      <h4 class="select-group__header">Product per page:</h4>
      <my-select
      class="select-group__select"
      :limit="limit"
      :maxLimit="maxLimit"
      @update="updateSelect"></my-select>
    </div>
    <nav class="pages">
      <button
      :class="{disabled: page === 1}"
      class="pages__arrow"
      @click="incDecPage('dec')"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
      </button>
      <button
        class="pages__page"
        :class="{ current: cyclePage === page }"
        v-for="cyclePage in paginationStore.totalPage"
        :key="cyclePage"
        @click="changePage(cyclePage)"
      >
        {{ cyclePage }}
      </button>
      <button
      :class="{disabled: page === paginationStore.totalPage}"
      class="pages__arrow"
      @click="incDecPage('inc')"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-right" />
      </button>
    </nav>
  </section>
</template>

<script lang="ts" setup>
import { usePaginationStore } from '@/store';
import { useCartStore } from '@/store';
import { storeToRefs } from 'pinia';

const paginationStore = usePaginationStore();
const cartStore = useCartStore();
const { limit, page } = storeToRefs(paginationStore);
const { maxLimit } = paginationStore;

const changePage = (currPage: number): void => {
  paginationStore.page = currPage;
};

const updateSelect = (value: number): void => {
  paginationStore.limit = value;
};

const incDecPage = (action: string): void => {
  if (action === 'inc') {
    if (page.value < paginationStore.totalPage) page.value += 1;
  } else {
    if (page.value > 1) page.value -= 1;
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.pagination {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  padding: 0.5rem 0;
  width: 100%;
  border-bottom: 1px solid $secondary;

  &__header {
    margin: 0;
    font-size: 1.3rem;
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
    gap: 0.1rem;

    .disabled {
      color: $secondary;
    }

    &__page, &__arrow {
      min-width: 2rem;
      font-size: 1.1rem;
      background-color: $light;
      border: 1px solid $secondary {
        radius: 5px;
      }
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: $light;
        background-color: $primary;
      }
    }
    .current {
      font-weight: 600;
      color: $light;
      background-color: $primary-darker;
      border: none;
    }
  }
}
</style>
