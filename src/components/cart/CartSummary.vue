<template>
  <form @submit.prevent class="summary-form">
    <div class="summary">
      <div class="summary__total-price">
        <span class="summary__total-price--header">Total</span>
        <span class="summary__total-price--total">{{ promoStore.getPromoPrice.toFixed(2) }} $</span>
      </div>
      <div class="summary__total-products">
        <span class="summary__total-products--count">Products, {{ cartStore.totalProducts }}pc. </span>
        <span class="summary__total-products--price">{{ promoStore.totalPrice.toFixed(2) }} $</span>
      </div>
      <div class="summary__discount" v-show="promoStore.isDiscounted">
        <span class="summary__discount--header">Discount</span>
        <span class="summary__discount--value"
          >{{ -(promoStore.totalPrice - promoStore.getPromoPrice).toFixed(2) }} $</span
        >
      </div>
      <div class="summary__promo">
        <h4 class="summary__promo--header">Enter your promocode:</h4>
        <input type="text" placeholder="promocode" class="summary__promo--input" v-model="promoStore.promo" />
      </div>
      <my-button class="summary__buy">Buy now</my-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { usePromoStore } from '@/store';
import { useCartStore } from '@/store';

const cartStore = useCartStore();
const promoStore = usePromoStore();
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

    &__total-price,
    &__total-products,
    &__discount {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__total-price {
      font-size: 1.3rem;
    }

    &__total-products,
    &__discount {
      color: $secondary;
    }
    &__promo {
      display: flex;
      flex-direction: column;
      align-items: center;

      &--header {
        margin: 0.5rem 0;
        font-weight: 400;
      }

      &--input {
        max-width: 80%;
        padding: 0.3em 0.6rem;
        font-size: 1.1em;
        border: none {
          radius: 10px;
        }
        outline: 2px solid $secondary;
        transition: all .2s;

        &:focus-visible {
          outline-color: $primary;
        }
      }
    }

    &__buy {
      margin-top: 1rem;
      width: 100%;
    }
  }
}
</style>
