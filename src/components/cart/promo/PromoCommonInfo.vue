<template>
  <div class="summary__total-products">
    <span class="summary__total-products--count">
      Products, {{ totalProducts }}pc.
    </span>
    <span class="summary__total-products--price">
      $<AppNumber :input="totalPrice" :fixed="2" />
    </span>
  </div>
  <div class="summary__discount" v-show="isDiscounted">
    <span class="summary__discount--header">Discount</span>
    <span class="summary__discount--value">
      <AppNumber :input="-(totalPrice - getPromoPrice)" :fixed="2" />$
    </span>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePromo, useCart } from '@/store';
const { totalProducts } = storeToRefs(useCart());
const { totalPrice, isDiscounted, getPromoPrice } = storeToRefs(usePromo());
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.summary__total-products,
.summary__discount {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: $secondary;
}
</style>
