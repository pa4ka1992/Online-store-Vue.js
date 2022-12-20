<template>
  <div class="product">
    <img class="product__image" :src="product['images'][0]" alt="product" />
    <div class="product__info">
      <div class="product__info--header">
        <div class="header__rating">{{ product['rating'] }}</div>
        <div class="header__title">{{ product['title'] }}</div>
      </div>
      <div class="product__info--description">{{ product['description'] }}</div>
    </div>
    <div class="product__count-info">
      <div class="product__count-info--stock">Stock:{{ product['stock'] }}</div>
      <div class="product__count-info--control">
        <button
          :disabled="product['count'] === 1"
          class="decrement"
          @click="cartStore.decrementCount(product as ICartProduct)"
        >
          -
        </button>
        <input type="number" class="count" :value="product['count']" @input="updateCount" />
        <button
          :disabled="product['count'] === product['stock']"
          class="increment"
          @click="cartStore.incrementCount(product as ICartProduct)"
        >
          +
        </button>
      </div>
      <div class="product__count-info--single-price">{{ product['price'] }}$/pc.</div>
      <button @click="cartStore.deleteProduct(product as ICartProduct)" class="delete">del</button>
    </div>
    <div class="product__price">
      <div class="product__price--full">{{ product['countPrice'] }}$</div>
      <div v-if="product['discountPercentage']" class="product__price--discount">
        Discount: {{ product['discountPercentage'] }}%
      </div>
      <div v-if="product['discountPercentage']" class="product__price--final">{{}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useCartStore } from '@/store';
import { ICartProduct } from '@/services//model/product';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const cartStore = useCartStore();

const updateCount = (e: Event): void => {
  const target = e.target as HTMLOptionElement;
  const valNumber = Number(target.value);
  if (valNumber === 0) {
    target.value = '1';
  } else if (valNumber > props.product['stock']) {
    target.value = props.product['stock'];
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
}
</style>
