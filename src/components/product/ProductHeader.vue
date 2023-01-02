<template>
  <div class="product__header">
    <h2 class="product__header--title">{{ product.title }}</h2>
    <div class="product__header--info">
      <div class="header__info--stars">
        <font-awesome-icon
          :class="{ gold: getStars() >= star }"
          v-for="star in allStars"
          :key="star"
          icon="fa-solid fa-star"
        />
      </div>
      <span class="header__info--rating">{{ product.rating }}</span>
      <div class="header__info--feedback">{{ getRandom(150) }} feedbacks</div>
      <span class="header__info--buy-count">Bought more than {{ getRandom(5) * 50 }} times</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from '@/services';
import { toRefs } from 'vue';
import { allStars } from './constants';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = toRefs(props);

const getStars = () => {
  return Math.floor(product.value.rating);
};

const getRandom = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.product__header {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &--title {
    margin: 0.5rem;
  }

  &--info {
    display: flex;
    gap: 1rem;
    color: $secondary;

    .gold {
      color: $warning;
    }

    .header__info--rating {
      color: $warning;
    }

    .header__info--feedback {
      border-bottom: 2px dashed $secondary;
      transition: all 0.2s;

      &:hover {
        color: $dark;
        border-color: $dark;
      }
    }
  }
}
</style>
