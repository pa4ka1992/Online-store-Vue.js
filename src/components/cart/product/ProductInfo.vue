<template>
  <div class="product__info">
    <div class="product__info--header">
      <font-awesome-icon icon="fa-solid fa-star" />
      <span class="header__rating">{{ rating }}</span>
      <span class="header__title">{{ title }}</span>
    </div>
    <span class="product__info--brand">Brand: {{ brand }}</span>
    <span class="product__info--description">{{ description }}</span>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ICartProduct } from '@/store/cart/types';

const props = defineProps<{
  product: Required<ICartProduct>;
}>();

const { title, brand, description, rating } = toRefs(props.product);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.product__info {
  justify-self: start;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
  text-align: left;

  &--header {
    display: flex;
    align-items: center;

    .fa-star {
      color: $warning;
    }
    .header__rating {
      margin-left: 0.2rem;
      font-weight: 600;
      color: $warning;
    }

    .header__title {
      margin-left: 1rem;
      font-weight: 600;
      color: $primary;
    }
  }

  &--brand {
    color: $secondary;
  }

  &--description {
    line-height: 1.3em;
  }
}
</style>
