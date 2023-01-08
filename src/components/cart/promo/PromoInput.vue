<template>
  <div class="summary__promo">
    <h4 class="summary__promo--header">Enter your promocode:</h4>
    <div class="promo__group">
      <input type="text" placeholder="promocode" class="promo__group--input" v-model="promo" />
      <span class="promo__group--tooltip"> Promocodes: "gachi", "300bucks", "storeRS", "RS-school"</span>
      <my-button :class="{ disabled: !isMatch || isAlreadyApplied }" class="promo__group--apply" @click="applyPromo"
        >Apply</my-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePromoStore } from '@/store';
import { storeToRefs } from 'pinia';

const { promo, isMatch, isAlreadyApplied } = storeToRefs(usePromoStore());
const { applyPromo } = usePromoStore();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.summary__promo {
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
    position: relative;

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

        & ~ .promo__group--tooltip {
          opacity: 0;
        }
      }

      &:hover ~ .promo__group--tooltip {
        opacity: 1;
      }
    }

    &--tooltip {
      position: absolute;
      padding: 0.5rem;
      top: -190%;
      background-color: $primary2-light;
      border-radius: 10px;
      opacity: 0;
      transition: all 0.2s;
      @include block-style;

      &::before {
        content: '';
        position: absolute;
        left: 30%;
        bottom: -20px;
        border: 10px solid transparent;
        border-top: 10px solid $primary2-light;
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
</style>
