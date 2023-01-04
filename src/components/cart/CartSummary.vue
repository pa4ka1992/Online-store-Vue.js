<template>
  <form @submit.prevent class="summary-form">
    <div class="summary">
      <total-prices />
      <promo-list />
      <additional-info />
      <promo-input />
      <my-button @click="modalIsShow = true" class="summary__buy">Buy now</my-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePromoStore, useModalStore } from '@/store';
import { PromoList, PromoInput, TotalPrices, AdditionalInfo } from '@/components/cart/promo/index';

const { totalPrice } = storeToRefs(usePromoStore());
const { modalIsShow } = storeToRefs(useModalStore());
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.summary-form {
  .summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    position: sticky;
    top: 1rem;
    padding: 1rem;
    border-radius: 12px;
    @include block-style;

    &__buy {
      margin-top: 1rem;
      width: 100%;
    }
  }
}
</style>
