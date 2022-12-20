<template>
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
</style>
