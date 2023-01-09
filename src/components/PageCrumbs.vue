<template>
  <nav class="product__crumbs">
    <font-awesome-icon v-show="crumbs && crumbs.length !== 0" @click="routeMain()" icon="fa-solid fa-arrow-left" />
    <ul class="crumbs__list">
      <li class="crumbs" @click="routeMain()">Main</li>
      <li class="crumbs" v-for="crumb in crumbs" :key="crumb.id">{{ crumb.way }}</li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import router from '@/router';
import { ICrumbs } from '@/components/_types';
import { RouteNames } from '@/router/names';

const props = defineProps<{
  crumbs: ICrumbs[];
}>();

const { crumbs } = reactive(props);

const routeMain = (): void => {
  router.push({ name: RouteNames.landing });
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

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

      &::first-letter {
        text-transform: uppercase;
      }

      &:hover {
        color: $dark;
        border-bottom: 1px dashed $dark;

        &::before {
          color: $secondary;
        }
      }
    }

    .crumbs:not(:last-child) {
      &::after {
        content: '/';
        margin-left: 0.5rem;
        font-size: 0.9em;
        color: $secondary;
      }
    }
  }
}
</style>
