<template>
  <form @submit.prevent class="summary-form">
    <div class="summary">
      <div class="summary__total-price">
        <span class="summary__total-price--header">Total</span>
        <span class="summary__total-price--total" :class="{ crossed: promoStore.isDiscounted }"
          >{{ promoStore.totalPrice.toFixed(2) }} $</span
        >
        <span v-if="promoStore.isDiscounted" class="summary__total-price--fixed"
          >{{ promoStore.getPromoPrice.toFixed(2) }} $</span
        >
      </div>
      <div v-if="promoStore.isDiscounted" class="summary__promo-list">
        <h4 class="summary__promo-list--header">Applied promos:</h4>
        <div class="summary__promo-list--code" v-for="promoCode in appliedPromos" :key="promoCode.id">
          <span class="promo__title">{{ promoCode.title }}</span>
          <span class="promo__value">Discount: {{ promoCode.value * 100 }}%</span>
          <span class="promo__delete">
            <font-awesome-icon
            icon="fa-solid fa-xmark"
            @click="promoStore.removePromo(promoCode.id)" />
          </span>
        </div>
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
        <div class="promo__group">
          <input type="text" placeholder="promocode" class="promo__group--input" v-model="promo" />
          <my-button 
          :class="{ disabled: !promoStore.isMatch || promoStore.isAlreadyApplied }" 
          class="promo__group--apply" 
          @click="promoStore.applyPromo"
            >Apply</my-button
          >
        </div>
      </div>
      <my-button class="summary__buy">Buy now</my-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { usePromoStore } from '@/store';
import { useCartStore } from '@/store';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const promoStore = usePromoStore();
const { promo, appliedPromos } = storeToRefs(promoStore);
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

    &__promo-list {
      padding: 0.5rem;
      width: 100%;
      @include block-style;

      &--header {
        margin: 0;
        padding-bottom: 0.5rem;
      }

      &--code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0;
        border-top: 1px solid $secondary;

        .promo__value {
          color: $success;
        }
        .promo__delete {
          padding: 0.1rem 0.5rem;
          transition: all .2s;
          
          &:hover {
            color: $danger;
            cursor: pointer;
          }

        }
      }
    }

    &__total-products,
    &__discount {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__total-price {
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

      .promo__group {
        display: flex;
        justify-content: space-between;
        gap: 1rem;

        &--input {
          padding: 0.3em 0.6rem;
          font-size: 1.1em;
          border: none {
            radius: 10px;
          }
          outline: 2px solid $secondary;
          transition: all 0.2s;

          &:focus-visible {
            transform: scale(0.96);
            outline-color: $primary;
          }
        }

        &--apply {
          background-color: $success;
        }

        .disabled {
          background-color: $secondary;
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
