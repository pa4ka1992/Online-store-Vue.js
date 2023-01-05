<script setup lang="ts">
import { IProduct } from '@/services';
import { useProductInfo } from '@/composables';
import { computed } from 'vue';

const props = defineProps<{
  product: IProduct;
}>();

const { fixedPrice, inCart, toggleProduct } = useProductInfo(props.product);

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
  <RouterLink class="a product product-card" :to="`/product/${product.id}`">
    <div class="product-card__head">
      <img class="product__image" :src="product.thumbnail" loading="lazy"/>
      <span class="product__heading">{{ product.title }}</span>
    </div>
    <div class="product-card__body">
      <div class="product-card__info">
        <div class="rating">
          <i class="icon-star rating__icon"></i>
          <span class="rating__value">{{ product.rating }}</span>
        </div>
        <div class="price">
          <span v-if="product.discountPercentage === 0"> ${{ product.price.toFixed(2) }} </span>
          <span v-else>
            <span class="price__actual">${{ product.price.toFixed(2) }}</span>
            <span class="price__fixed">${{ fixedPrice.toFixed(2) }}</span>
          </span>
        </div>
      </div>
      <button class="btn cart-btn product-card__cart-btn" :class="cartBtnClass" @click="cartBtnClick">
        <i v-if="!inCart" class="icon-cart-plus"></i>
        <i v-else class="icon-cart-ok"></i>
      </button>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
@import './common.scss';

.product-card {
  width: 250px;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  &__head {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
    max-width: 100%;
  }

  &__body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__cart-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
</style>
