<template>
  <div v-if="isDiscounted" class="summary__promo-list">
    <h4 class="summary__promo-list--header">Applied promos:</h4>
    <div class="summary__promo-list--code" v-for="promoCode in appliedPromos" :key="promoCode.id">
      <span class="promo__title">{{ promoCode.title }}</span>
      <span class="promo__value">
        Discount:
        <my-number :input="promoCode.value * 100" :fixed="0" />%
      </span>
      <span class="promo__delete">
        <font-awesome-icon icon="fa-solid fa-xmark" @click="removePromo(promoCode.id)" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePromoStore } from '@/store';
import { storeToRefs } from 'pinia';

const { appliedPromos, isDiscounted } = storeToRefs(usePromoStore());
const { removePromo } = usePromoStore();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.summary__promo-list {
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
</style>
