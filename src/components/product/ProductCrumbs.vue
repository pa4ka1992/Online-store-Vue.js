<template>
  <nav class="product__crumbs">
    <font-awesome-icon @click="routeMain()" icon="fa-solid fa-arrow-left" />
    <ul class="crumbs__list">
      <li class="crumbs__list--main crumbs" @click="routeMain()">Main</li>
      <li class="crumbs__list--category crumbs">{{ product.category }}</li>
      <li class="crumbs__list--brand crumbs">{{ product.brand }}</li>
      <li class="crumbs__list--title crumbs">{{ product.title }}</li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { IProduct } from '@/services';
import { toRefs } from 'vue';
import router from '@/router';

const props = defineProps<{
  product: IProduct;
}>();

const { product } = toRefs(props);

const routeMain = (): void => {
  router.push({ path: '/' });
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';

.product__crumbs {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-family: 'Nunito', sans-serif;
  color: $secondary;

  .fa-arrow-left {
    position: relative;
    margin-right: 0.5em;
    padding: 0.5rem;
    font-size: 1.2rem;
    color: $dark;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }

  .crumbs__list {
    display: flex;
    gap: 0.5rem;
    padding: 0;
    list-style: none;

    .crumbs {
      border-bottom: 1px dashed transparent;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: $dark;
        border-bottom: 1px dashed $dark;
      }
    }

    .crumbs:not(:first-child) {
      &::before {
        content: '/';
        margin-right: 0.5rem;
        font-size: 0.9em;
      }
    }
  }
}
</style>
