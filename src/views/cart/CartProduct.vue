<template>
  <div class="product">
    <img class="product__image" :src="images[0]" alt="product" />
    <div class="product__info">
      <div class="product__info--header">
        <font-awesome-icon icon="fa-solid fa-star" />
        <div class="header__rating">{{ rating }}</div>
        <div class="header__title">{{ title }}</div>
      </div>
      <div class="product__info--brand">Brand: {{ brand }}</div>
      <div class="product__info--description">{{ description }}</div>
    </div>
    <div class="product__count-info">
      <div class="product__count-info--stock">Stock:{{ stock }}</div>
      <div class="product__count-info--control">
        <button :disabled="count === 1" class="decrement" @click="cartStore.decrementCount(product)">
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
        <input type="number" class="count" :value="count" @input="updateCount" />
        <button :disabled="count === stock" class="increment" @click="cartStore.incrementCount(product)">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
      <div class="product__count-info--single-price">{{ price }}$/pc.</div>
      <button
        @click="cartStore.deleteProduct(product)"
        @mouseover="anime = true"
        @mouseout="anime = false"
        class="delete"
      >
        <font-awesome-icon v-if="anime" icon="fa-solid fa-trash" bounce />
        <font-awesome-icon v-else icon="fa-solid fa-trash" />
      </button>
    </div>
    <div class="product__price">
      <div class="product__price--full" :class="{ crossed: product['discountPercentage'] }">{{ countPrice }} $</div>
      <div v-if="discountPercentage" class="product__price--discount">Discount: {{ discountPercentage }}%</div>
      <div v-if="discountPercentage" class="product__price--final">{{ fixPrice }} $</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useCartStore } from '@/store';
import { ICartProduct } from '@/services//model/product';
import { ref } from 'vue';

const props = defineProps<{
  product: Required<ICartProduct>;
}>();

const { images, title, brand, discountPercentage, description, price, rating, stock, count, countPrice, fixPrice } =
  toRefs(props.product);

const anime = ref(false);

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
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  place-items: center center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid $secondary {
    radius: 5px;
  }

  &__image {
    display: block;
    max-width: 15rem;
  }

  &__info {
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

  &__count-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .count {
      max-width: 3rem;
    }
    .delete {
      .fa-trash {
        font-size: 1rem;
        color: $delete;
      }
    }
  }

  &__price {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &--full {
      font-weight: 600;
    }

    &--discount {
      font-weight: 600;
      font-style: italic;
    }

    &--final {
      font-weight: 600;
    }

    .crossed {
      text-decoration: line-through;
      font-weight: 400;
    }
  }
}
</style>
