<script lang="ts" setup>
import { ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  title: string;
}>();

const collapsed = ref(false);
</script>

<template>
  <section class="filter-dropdown">
    <div class="filter-dropdown__head">
      <h4 class="filter-dropdown__title">{{ title }}</h4>
      <button
        class="btn filter-dropdown__button"
        :class="!collapsed ? 'filter-dropdown__button_active' : ''"
        @click="collapsed = !collapsed"
      >
        <i class="icon-next"></i>
      </button>
    </div>

    <section :class="!collapsed ? 'filter-dropdown__content_collapsed' : ''" class="filter-dropdown__content">
      <span class="filter-dropdown__divider"></span>
      <div class="filter-dropdown__content-wrap">
        <slot></slot>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.filter-dropdown {
  background-color: $primary-dark;
  color: $white;
  border-radius: 20px;
  max-width: 300px;
  padding: 10px;

  font-size: 0.9rem;

  &__head {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }

  &__title {
    margin: 0;
    font-size: 1.5em;
    font-weight: 400;
  }

  &__button {
    color: $white;
    rotate: -90deg;
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    transition: rotate 0.2s ease;

    &_active {
      rotate: 90deg;
    }
  }

  &__content {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    overflow: hidden;
    height: 200px;
    transition: height 0.2s;

    &_collapsed {  
      height: 0;
    }
  }

  &__content-wrap {
    max-height: 100%;
    padding: 10px 20px;
  }

  &__divider {
    border-top: 1px $white solid;
  }
}
</style>
