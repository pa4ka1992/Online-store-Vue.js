<template>
  <div class="summary__total-price">
    <span class="summary__total-price--header">Total</span>
    <span class="summary__total-price--total" :class="{ crossed: isDiscounted }">
      <my-number :input="totalPrice" :fixed="2" /> $
    </span>
    <span v-if="isDiscounted" class="summary__total-price--fixed">
      <my-number :input="getPromoPrice" :fixed="2" /> $
    </span>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePromoStore } from '@/store';

const { totalPrice, isDiscounted, getPromoPrice } = storeToRefs(usePromoStore());
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.summary__total-price {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: repeat(2, 1fr);
  width: 100%;
  font-size: 1.3rem;

  &--fixed,
  &--total {
    justify-self: end;
  }

  &--fixed {
    grid-column: 2 / 3;
  }

  .crossed {
    font-size: 1.1rem;
    color: $danger;
    text-decoration: line-through;
  }
}
</style>
