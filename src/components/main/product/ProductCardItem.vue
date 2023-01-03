<script setup lang="ts">
import { IProduct } from '@/services';
import { useProductInfo } from '@/composables';
import { computed } from 'vue';

const props = defineProps<{
  product: IProduct
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
  <RouterLink class="a product-card" :to="`/product/${product.id}`">
    <div class="product-card__image-wrap">
      <img class="product-card__image" :src="product.thumbnail"/>
      <span class="product-card__heading">{{ product.title }}</span>
    </div>
    <div class="product-card__body"> 
      <div class="product-card__info">
        <div class="rating">
          <i class="icon-star rating__icon"></i>
          <span class="rating__value">{{ product.rating }}</span>
        </div>
        <div class="product-price"> 
          <span v-if="product.discountPercentage === 0"> 
            ${{ product.price.toFixed(2) }}
          </span>
          <span v-else>
            <span class="product-price__actual">${{ product.price.toFixed(2) }}</span>
            <span class="product-price__fixed">${{ fixedPrice.toFixed(2) }}</span>
          </span>
        </div>
      </div>
      <button class="btn cart-btn" :class="cartBtnClass" @click="cartBtnClick"> 
        <i v-if="!inCart" class="icon-cart-plus"></i>
        <i v-else class="icon-cart-ok"></i>
      </button>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';
.product-card {
  width: 250px;
  padding: 20px;
  background-color: $white;
  border-radius: 20px;

  transition: box-shadow 0.25s, scale 0.25s;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  @include apply-shadow;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.6);
    scale: 1.04;
  }
  
  &__image-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
  }

  &__image {
    max-width: 200px;
    height: 200px;
    border-radius: 20px;
    display: block;
    margin-bottom: 10px;
  }

  &__heading {
    text-align: center;
    font-size: 0.9rem;
  }

  &__body {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

.cart-btn {
    font-size: 1.7rem;
    width: 60px;
    height: 60px;
    background-color: $primary;
    transition: background-color 0.25s;
    padding: 5px;
    border-radius: 50%;
    @include apply-shadow;

    &:hover {
      background-color: $primary-light;
    }

    &_in-cart {
      background-color: $success;
      color: $white;

      &:hover {
        background-color: $success-light;
      }
    }
  }
.rating {
  color: $primary;

  &__icon {
    font-size: 1.2rem;

    &::before {
      margin-left: 0;
    }
  }

  &__value {
    font-weight: 600;
  }
}

.product-price {
  font-size: 1rem;
  font-weight: 600;

  &__actual {
    text-decoration: line-through;
    margin-right: 10px;
    color: $secondary;
  }

  &__fixed {
    color: $success;
  }
}

</style>