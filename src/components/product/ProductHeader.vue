<template>
  <div class="product__header">
    <h2 class="product__header--title">{{ title }}</h2>
    <div class="product__header--info">
      <div class="header__info--stars">
        <font-awesome-icon
          :class="{ gold: getStars() >= star }"
          v-for="star in allStars"
          :key="star"
          icon="fa-solid fa-star"
        />
      </div>
      <span class="header__info--rating">{{ rating }}</span>
      <span class="header__info--feedback"> {{ getRandom(150) }} feedbacks </span>
      <span class="header__info--buy-count"> Bought more than {{ getRandom(5) * 50 }} times </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from '@/services';
import { toRefs, reactive } from 'vue';
import { allStars } from './constants';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = reactive(props);
const { title, rating } = toRefs(product);

const getStars = () => {
  return Math.floor(rating.value);
};

const getRandom = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.product__header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;

  &--title {
    margin: 0.5rem;
    color: $primary;
    @include text-style;
  }

  &--info {
    display: flex;
    gap: 1rem;
    color: $secondary;

    .gold {
      color: $warning;
    }

    .header__info {
      &--rating {
        color: $warning;
      }

      &--feedback {
        border-bottom: 1px dashed $secondary;
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          color: $dark;
          border-color: $dark;
        }
      }
    }
  }
}
</style>
