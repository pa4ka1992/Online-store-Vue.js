<template>
  <div class="product">
    <img class="product__image" :src="images[0]" alt="product" />
    <div class="product__info">
      <div class="product__info--header">
        <div class="header__rating">{{ rating }}</div>
        <div class="header__title">{{ title }}</div>
      </div>
      <div class="product__brand">Brand:{{ brand }}</div>
      <div class="product__info--description">{{ description }}</div>
    </div>
    <div class="product__count-info">
      <div class="product__count-info--stock">Stock:{{ stock }}</div>
      <div class="product__count-info--control">
        <button
          :disabled="count === 1"
          class="decrement"
          @click="cartStore.decrementCount(product)"
        >
          -
        </button>
        <input type="number" class="count" :value="count" @input="updateCount" />
        <button
          :disabled="count === stock"
          class="increment"
          @click="cartStore.incrementCount(product)"
        >
          +
        </button>
      </div>
      <div class="product__count-info--single-price">{{ price }}$/pc.</div>
      <button @click="cartStore.deleteProduct(product)" class="delete">del</button>
    </div>
    <div class="product__price">
      <div class="product__price--full" :class="{ crossed: product['discountPercentage'] }">
        {{ countPrice }}$
      </div>
      <div v-if="discountPercentage" class="product__price--discount">
        Discount: {{ discountPercentage }}%
      </div>
      <div v-if="discountPercentage" class="product__price--final">{{}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import { useCartStore } from '@/store';
import { ICartProduct } from '@/services//model/product';

const props = defineProps<{
  product: Required<ICartProduct>;
}>();

const { images,
  title,
  brand,
  discountPercentage,
  description,
  price,
  rating,
  stock,
  count,
  countPrice
 } = toRefs(props.product);

const cartStore = useCartStore();

const updateCount = (e: Event): void => {
  const target = e.target as HTMLOptionElement;
  const valNumber = Number(target.value);
  if (valNumber === 0) {
    target.value = '1';
  } else if (valNumber > props.product['stock']) {
    target.value = String(props.product['stock']);
  }
  cartStore.updateCount(target.value, props.product as ICartProduct);
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.product {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  padding: 0.5rem;

  border: 1px solid $secondary {
    radius: 5px;
  }

  &__image {
    display: block;
    max-width: 15rem;
  }

  &__info {
    flex-basis: 50%;

    text-align: left;

    &--header {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;

      .header__rating {
        font-weight: 600;

        color: $gold;
      }

      .header__title {
        font-weight: 600;

        color: $primary;
      }
    }
  }

  &__count-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;

    .count {
      max-width: 3rem;
    }
  }

  &__price {
    .crossed {
      text-decoration: line-through;
    }
  }
}
</style>
