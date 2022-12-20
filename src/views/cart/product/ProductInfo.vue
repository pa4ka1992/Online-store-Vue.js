<template>
  <div class="product__info">
    <div class="product__info--header">
      <font-awesome-icon icon="fa-solid fa-star" />
      <div class="header__rating">{{ rating }}</div>
      <div class="header__title">{{ title }}</div>
    </div>
    <div class="product__info--brand">Brand: {{ brand }}</div>
    <div class="product__info--description">{{ description }}</div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ICartProduct } from '@/services//model/product';

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

    .fa-star {
      color: $gold;
    }
    .header__rating {
      margin-left: 0.2rem;
      font-weight: 600;
      color: $gold;
    }

    .header__title {
      margin-left: 1rem;
      font-weight: 600;
      color: $primary;
    }
  }

  &--brand {
    color: $secondary;
    font-style: italic;
  }

  &--description {
    line-height: 1.3em;
  }
}
</style>
