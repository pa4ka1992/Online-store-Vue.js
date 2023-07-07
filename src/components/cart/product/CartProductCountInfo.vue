<template>
  <div class="product__count-info">
    <button :class="{ active: props.isHovered }" @click="dropProduct(product.id)" class="delete">
      <font-awesome-icon icon="fa-solid fa-trash" />
    </button>
    <div class="count-info__wrapper">
      <span class="count-info__wrapper--stock">Stock: {{ product.stock }}pc.</span>
      <div class="count-info__wrapper--control">
        <button class="decrement" @click="decrementCount(product.id)">
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
        <input @input="limitStock" type="number" class="count" :value="item.count" @change="updateInput" />
        <button :disabled="item.count === product.stock" class="increment" @click="incrementCount(item.product.id)">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
      <span class="count-info__wrapper--single-price">{{ product.actualPrice.toFixed(2) }}$/pc.</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useCart } from '@/store';
import { ICartItem } from '@/store/cart/_types';

const props = defineProps<{
  item: ICartItem;
  isHovered: boolean;
}>();

const { product } = toRefs(props.item);
const { decrementCount, incrementCount, dropProduct, updateCount } = useCart();

const updateInput = ({ target }: Event): void => {
  if (target instanceof HTMLInputElement) {
    updateCount(target.value, product.value['id']);
  }
};

const limitStock = ({ target }: Event): void => {
  if (target instanceof HTMLInputElement) {
    const valNumber = Number(target.value);

    if (valNumber > product.value['stock']) {
      target.value = String(product.value['stock']);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.product__count-info {
  justify-self: start;
  display: flex;
  align-items: center;

  .delete {
    width: 100%;
    padding: 1rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s;

    &:hover {
      color: $danger;
      transform: scale(1.2);
    }
    .fa-trash {
      font-size: 1rem;
    }
  }

  .active {
    opacity: 1;
  }

  .count-info__wrapper {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &--control {
      padding: 0.3rem;
      background-color: $white;
      border-radius: 12px;
      @include block-style;

      .increment,
      .decrement {
        padding: 0.5rem;
        background-color: transparent;
        border: none {
          radius: 10px;
        }
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          color: $light;
          background-color: $primary-dark;
        }
        &:hover:disabled {
          background-color: transparent;
        }
      }
      .count {
        font-size: 1rem;
        max-width: 3rem;
        background-color: transparent;
        border: none;
        text-align: center;
        -webkit-appearance: none;
        appearance: none;

        &:focus-visible {
          outline: none;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
    }

    &--single-price,
    &--stock {
      color: $secondary;
    }
  }
}
</style>
