<template>
  <div class="product__info">
    <div class="product__info--header">
      <font-awesome-icon icon="fa-solid fa-star" />
      <span class="header__rating">{{ rating }}</span>
      <router-link :to="{ name: 'product', params: { id: `${id}` } }">
        <span class="header__title">{{ title }}</span>
      </router-link>
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

const { id, title, brand, description, rating } = toRefs(props.product);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

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

    .header {
      &__rating {
        margin-left: 0.2rem;
        font-weight: 600;
        color: $warning;
      }

      &__title {
        margin-left: 1rem;
        font-weight: 600;
        color: $primary;
        border-bottom: 1px solid transparent;
        transition: all 0.2s;
        @include text-style;

        &:hover {
          color: $primary-dark;
          border-bottom: 1px solid $primary-dark;
        }
      }
    }
  }

  &--brand {
    color: $secondary;
  }

  &--description {
    line-height: 1.3em;
    @include text-style;
  }
}
</style>
