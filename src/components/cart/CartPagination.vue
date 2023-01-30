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
      <div class="select-group__select" tabindex="0" @blur="isCollapsed = true">
        <div @click="updateSelect" class="select-group__select--limit" :class="{ 'select-opened': !isCollapsed }">
          {{ limit }}
          <i class="icon-next" :class="{ 'next-opened': !isCollapsed }" />
        </div>
        <ul v-if="!isCollapsed" class="select-group__select--list">
          <li
            class="select-group__select--option"
            @click="changeOption(option)"
            v-for="option in maxLimit"
            :key="option"
          >
            {{ option }}
          </li>
        </ul>
      </div>
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
import { usePagination } from '@/store';
import { useCart } from '@/store';
import { storeToRefs } from 'pinia';
import Paginate from 'vuejs-paginate-next';
import { maxLimit } from '@/store/cart/_constants';
import { ref } from 'vue';

const { totalProducts } = storeToRefs(useCart());
const { limit, page, totalPage } = storeToRefs(usePagination());
const isCollapsed = ref(true);
const MyPaginate = Paginate;

const changeOption = (option: number): void => {
  limit.value = option;
  isCollapsed.value = true;
};

const updateSelect = (): void => {
  isCollapsed.value = !!isCollapsed.value;
};
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
      position: relative;

      .icon-next {
        transform-origin: center;
        transform: rotate(90deg);
        transition: all 0.2s;

        &::before {
          font-size: 1.3em;
          color: $white;
        }
      }

      .next-opened {
        transform: rotate(-90deg);
      }

      &--limit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.3em;
        padding: 0.3em;
        padding-left: 1.1em;
        min-width: 5.1rem;
        font-size: 1rem;
        color: $white;
        background-color: $primary;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 6px rgb(0 0 0 / 30%);
        cursor: pointer;
      }

      .select-opened {
        border-bottom: {
          left-radius: 0;
          right-radius: 0;
        }
      }

      &--list {
        position: absolute;
        margin: 0;
        padding: 0.3em;
        min-width: 5.1rem;
        list-style: none;
        color: $white;
        background-color: $primary;
        border: {
          top: 1px solid $white;
          bottom: {
            left-radius: 10px;
            right-radius: 10px;
          }
        }
        cursor: pointer;
      }

      &--option {
        padding: 0.1em;
        padding-left: 0.8em;
        border-radius: 10px;

        &:hover {
          background-color: $primary-dark;
        }
      }
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
