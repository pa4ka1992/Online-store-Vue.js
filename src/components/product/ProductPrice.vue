<template>
  <div class="price__wrapper">
    <section class="product__price-info">
      <div class="product__prices">
        <span v-if="discountPercentage" class="product__price--fix"> {{ getFixPrice().toFixed(0) }} $ </span>
        <span :class="{ crossed: discountPercentage }" class="product__price--full"> {{ price }} $ </span>
      </div>
      <div class="product__stock">
        Left in stock: {{ stock }}pc.
      </div>
      <div class="product__buttons">
        <my-button>Add to cart</my-button>
        <my-button>Buy</my-button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from '@/services';
import { toRefs } from 'vue';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = toRefs(props);
const { discountPercentage, price, stock} = toRefs(product.value);

const getFixPrice = () => {
  return price.value * (1 - discountPercentage.value / 100);
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.price__wrapper {
  flex-basis: 20%;
  font: {
    size: 1.5rem;
    weight: 600;
  }

  .product__price-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: sticky;
    top: 1rem;
    padding: 1rem;
    @include block-style;

    .product__prices {
      display: flex;
      align-items: flex-end;
      gap: 1rem;

      .crossed {
        font: {
          size: 1rem;
          weight: 400;
        }
        color: $secondary;
        text-decoration: line-through;
      }
    }

    .product__stock {
      font-size: 1rem;
      font-weight: 400;
      color: $secondary;
    }

    .product__buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;

    }
  }
}
</style>
