<template>
  <form @submit.prevent class="summary-form">
    <div class="summary">
      <h3 class="summary__header">Summary</h3>
      <div class="summary__total-products">
        <span class="summary__total-products--header">Products: </span>
        <span class="summary__total-products--count">{{ cartStore.totalProducts }}</span>
      </div>
      <div class="summary__total-price--full">
        <span class="summary__total-price--header">Total: </span>
        <span class="summary__total-price--money">{{ cartStore.totalPrice }}$</span>
      </div>
      <div class="summary__total-price--discount" v-show="cartStore.isDiscounted">
          <span class="discount__header">Total with discount: </span>
          <span class="discount__total">{{ cartStore.getPromoPrice }}$</span>
        </div>
      <input type="text" placeholder="Enter promocode" class="summary__promo" v-model="cartStore.promo" />
      <my-button class="summary__buy">Buy now</my-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store';

const cartStore = useCartStore();

</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';


.summary-form {
  .summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    bottom: 1rem;
    border-radius: 12px;

    &__total-price {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    
  }
}
</style>
