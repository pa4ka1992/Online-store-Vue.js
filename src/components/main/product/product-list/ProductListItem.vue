<script setup lang="ts">
import { IProduct } from '@/services';
import { useProductInfo } from '@/composables';
import { computed } from 'vue';
import { RouteNames } from '@/router';

const props = defineProps<{
  product: IProduct;
}>();

const { inCart, toggleProduct } = useProductInfo(props.product);

const cartBtnClass = computed(() => {
  if (inCart.value) return 'cart-btn_in-cart';
  else return '';
});

function cartBtnClick(e: Event) {
  e.preventDefault();
  toggleProduct();
}
</script>

<template>
  <div class="a product product-list-item">
    <div class="product-list-item__image-wrap">
      <img class="product__image" :src="product.thumbnail" loading="lazy" />
    </div>
    <div class="product-list-item__info">
      <RouterLink :to="{ name: RouteNames.product, params: { id: `${product.id}` } }" class="a product__heading product-list-item__heading">
        {{ product.title }}
      </RouterLink>

      <div class="rating">
        <span class="rating__title">Rating:</span>
        <i class="icon-star rating__icon"></i>
        <span class="rating__value">{{ product.rating }}</span>
      </div>

      <div class="product-char">
        <span class="product-char__name">Category</span>
        <span class="product-char__value">{{ product.category }}</span>
      </div>

      <div class="product-char">
        <span class="product-char__name">Brand</span>
        <span class="product-char__value">{{ product.brand }}</span>
      </div>

      <div class="product-char">
        <span class="product-char__name">Description</span>
        <span class="product-char__value">{{ product.description }}</span>
      </div>
    </div>
    <div class="product-list-item__actions">
      <div class="price product-list-item__price">
        <span v-if="product.discountPercentage === 0"> ${{ product.actualPrice.toFixed(2) }} </span>
        <span v-else>
          <span class="price__actual product-list-item__price-value">${{ product.actualPrice.toFixed(2) }}</span>
          <span class="price__fixed product-list-item__price-value">${{ product.price.toFixed(2) }}</span>
        </span>
      </div>
      <button class="btn cart-btn" :class="cartBtnClass" @click="cartBtnClick">
        <i v-if="!inCart" class="icon-cart-plus cart-btn__icon"></i>
        <i v-else class="icon-cart-ok cart-btn__icon"></i>
        <span class="cart-btn__text">{{ !inCart ? 'Add to cart' : 'Added!' }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './common.scss';
.product-list-item {
  display: flex;
  width: 100%;
  justify-content: space-between;

  &__image-wrap {
    padding: 20px;
    display: flex;
    align-items: center;
  }

  &__heading {
    font-size: 1.2rem;
    white-space: normal;
  }

  &__info {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
  }

  &__head {
    display: flex;
  }

  &__actions {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  &__price {
    font-size: 1.9rem;
  }

  &__price-value {
    margin: 0;
    display: block;
  }
}
</style>
