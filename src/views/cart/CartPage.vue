<template>
  <section v-if="cartStore.cart.length > 0">
    <div class="products-in-cart">
      <div class="pagination">
        <h3 class="header">Products in cart</h3>
        <input class="limit" type="text" v-model="cartStore.limit" />
        <div class="pages" v-for="page in cartStore.totalPage" :key="page" @click="changePage(page)">{{ page }}</div>
      </div>
      <div class="products">
        <cart-product v-for="product in cartStore.pageProducts" :product="product" :key="product.id" />
      </div>
    </div>
    <form @submit.prevent class="summary">
      <h3 class="header">Summary</h3>
      <div class="total-products">
        <span class="total-header">Products</span>
        <span class="total-count">{{ cartStore.totalProducts }}</span>
      </div>
      <div class="total-price">
        <span class="total-header">Total</span>
        <span class="total-money">{{ cartStore.totalPrice }}</span>
        <div class="total-discount" v-if="cartStore.isDiscounted">
          <span class="discount-header">Total with discount</span>
          <span class="total-discount">{{ cartStore.getPromoPrice }} </span>
        </div>
      </div>
      <input type="text" class="promo" v-model="cartStore.promo" />
      <button class="buy">Buy now</button>
    </form>
  </section>
  <h3 class="empty" v-else>Cart is empty</h3>
</template>

<script lang="ts" setup>
import { useCartStore } from '../../store';
import CartProduct from './CartProduct.vue';

const cartStore = useCartStore();
const changePage = (currPage: number): void => {
  cartStore.page = currPage;
};
</script>
