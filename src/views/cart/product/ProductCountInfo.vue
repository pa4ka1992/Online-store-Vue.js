<template>
  <div class="product__count-info">
    <button
      @click="cartStore.deleteProduct(product)"
      @mouseover="anime = true"
      @mouseout="anime = false"
      class="delete"
    >
      <font-awesome-icon v-if="anime" icon="fa-solid fa-trash" bounce />
      <font-awesome-icon v-else icon="fa-solid fa-trash" />
    </button>
    <div class="count-info__wrapper">
      <div class="count-info__wrapper--stock">Stock:{{ stock }}pc.</div>
      <div class="count-info__wrapper--control">
        <button :disabled="count === 1" class="decrement" @click="cartStore.decrementCount(product)">
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
        <input type="number" class="count" :value="count" @input="updateCount" />
        <button :disabled="count === stock" class="increment" @click="cartStore.incrementCount(product)">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
      <div class="count-info__wrapper--single-price">{{ price }}$/pc.</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { useCartStore } from '@/store';
import { ICartProduct } from '@/services/model/product';

const props = defineProps<{
  product: Required<ICartProduct>;
}>();

const { price, stock, count } = toRefs(props.product);
const cartStore = useCartStore();

const anime = ref(false);

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

.product__count-info {
  display: flex;
  gap: 1rem;
  align-items: center;

  .delete {
    width: 100%;
    padding: 1rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    .fa-trash {
      font-size: 1rem;
      color: $danger;
    }
  }
  .count-info__wrapper {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    &--control {
      margin: 1rem 0;
      border: 1px solid $secondary {
        radius: 5px;
      }

      .increment,
      .decrement {
        padding: 0.5rem;
        background-color: transparent;
        border: none {
          radius: 4px;
        }
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          background-color: $secondary;
        }
        &:hover:disabled {
          background-color: transparent;
        }
      }
      .count {
        font-size: 1rem;
        max-width: 3rem;
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
  }
}
</style>
