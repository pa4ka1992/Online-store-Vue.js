<template>
    <div class="pagination">
        <h3 class="header">Products in cart</h3>
        <my-select
        :value="cartStore.limit"
        :options="cartStore.maxLimit"
        @update="updateSelect"
        ></my-select>
        <div class="pages" v-for="page in cartStore.totalPage" :key="page" @click="changePage(page)">{{ page }}</div>
      </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store';

const cartStore = useCartStore();
const changePage = (currPage: number): void => {
  cartStore.page = currPage;
};
const updateSelect = (value: number) => {
  cartStore.limit = value
}
</script>