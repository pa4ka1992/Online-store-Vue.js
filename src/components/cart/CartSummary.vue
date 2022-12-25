<template>
  <form @submit.prevent class="summary-form">
    <div class="summary">
      <div class="summary__total-price">
        <span class="summary__total-price--header">Total</span>
        <span class="summary__total-price--total" :class="{ crossed: isDiscounted }"
          >{{ totalPrice.toFixed(2) }} $</span
        >
        <span v-if="isDiscounted" class="summary__total-price--fixed">{{ getPromoPrice.toFixed(2) }} $</span>
      </div>
      <div v-if="isDiscounted" class="summary__promo-list">
        <h4 class="summary__promo-list--header">Applied promos:</h4>
        <div class="summary__promo-list--code" v-for="promoCode in appliedPromos" :key="promoCode.id">
          <span class="promo__title">{{ promoCode.title }}</span>
          <span class="promo__value">Discount: {{ promoCode.value * 100 }}%</span>
          <span class="promo__delete">
            <font-awesome-icon icon="fa-solid fa-xmark" @click="removePromo(promoCode.id)" />
          </span>
        </div>
      </div>
      <div class="summary__total-products">
        <span class="summary__total-products--count">Products, {{ totalProducts }}pc. </span>
        <span class="summary__total-products--price">{{ totalPrice.toFixed(2) }} $</span>
      </div>
      <div class="summary__discount" v-show="isDiscounted">
        <span class="summary__discount--header">Discount</span>
        <span class="summary__discount--value">{{ -(totalPrice - getPromoPrice).toFixed(2) }} $</span>
      </div>
      <div class="summary__promo">
        <h4 class="summary__promo--header">Enter your promocode:</h4>
        <div class="promo__group">
          <input type="text" placeholder="promocode" class="promo__group--input" v-model="promo" />
          <my-button
            :class="{ disabled: !isMatch || isAlreadyApplied }"
            class="promo__group--apply"
            @click="applyPromo"
            >Apply</my-button
          >
        </div>
      </div>
      <my-button @click="modalIsShow = true" class="summary__buy">Buy now</my-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { usePromoStore, useCartStore, useModalStore } from '@/store';
import { storeToRefs } from 'pinia';

const { totalProducts } = storeToRefs(useCartStore());
const {
    promo,
    appliedPromos,
    totalPrice,
    isDiscounted,
    getPromoPrice,
    isMatch,
    isAlreadyApplied
  } = storeToRefs(usePromoStore());
const { applyPromo, removePromo } = usePromoStore();
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
          transition: all 0.2s;

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
