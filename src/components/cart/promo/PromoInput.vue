<template>
  <div class="summary__promo">
    <h4 class="summary__promo--header">Enter your promocode:</h4>
    <div class="promo__group">
      <input type="text" placeholder="promocode" tooltip="Promocodes for test: gachi, 300bucks, rs-school" class="promo__group--input" v-model="promo" />
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
</style>
