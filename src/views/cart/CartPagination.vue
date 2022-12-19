<template>
    <div class="pagination">
        <h3 class="header">Products in cart</h3>
        <select v-model="cartStore.limit">
          <option disabled value="">Выберите количество</option>
          <option v-for="lim in cartStore.maxLimit" :key="lim" :value="lim">{{ lim }}</option>
        </select>
        <div class="pages" v-for="page in cartStore.totalPage" :key="page" @click="changePage(page)">{{ page }}</div>
      </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '../../store';

const cartStore = useCartStore();
const changePage = (currPage: number): void => {
  cartStore.page = currPage;
};
</script>