<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  title: string;
}>();

const collapsed = ref(false);
const isOnTop = ref(false);
const isOnBottom = ref(false);
const scrollHide = props.title === 'Price' || props.title === 'Stock' ? false : true;

const updateArrows = ({ target }: Event) => {
  if (target instanceof HTMLDivElement) {
    const top: number = target.scrollTop;
    const bottom = target.scrollHeight - target.clientHeight - top;

    isOnTop.value = top ? true : false;
    isOnBottom.value = bottom ? true : false;
  }
};
</script>

<template>
  <section class="filter-dropdown">
    <div class="filter-dropdown__head" @click="collapsed = !collapsed">
      <h4 class="filter-dropdown__title">{{ title }}</h4>
      <button class="btn filter-dropdown__button" :class="!collapsed ? 'filter-dropdown__button_active' : ''">
        <i class="icon-next"></i>
      </button>
    </div>

    <section :class="!collapsed ? 'filter-dropdown__content_collapsed' : ''" class="filter-dropdown__content">
      <span class="filter-dropdown__divider"></span>
      <font-awesome-icon
        v-show="scrollHide"
        class="icon-next icon-next__top"
        :class="{ active: !isOnTop }"
        icon="fa-solid fa-angles-up"
      />
      <div class="filter-dropdown__content-wrap" @scroll="updateArrows">
        <slot></slot>
      </div>
      <font-awesome-icon
        v-show="scrollHide"
        class="icon-next icon-next__bottom"
        :class="{ active: !isOnBottom }"
        icon="fa-solid fa-angles-down"
      />
    </section>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

::-webkit-scrollbar {
  width: 7px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: $primary-light;
  border-radius: 10px;

  &:hover {
    background-color: $primary-dark;
  }
}

.filter-dropdown {
  background-color: $primary;
  color: $white;
  border-radius: 20px;
  width: 270px;
  padding: 5px;
  font-size: 0.9rem;
  transition: all 0.3s;
  filter: brightness(100%);

  &:hover {
    filter: brightness(95%);
  }

  &__head {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
    cursor: pointer;
    user-select: none;
  }

  &__title {
    margin: 0;
    font-size: 1.2em;
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
    font-size: 1.5em;
    transition: rotate 0.2s ease;

    &_active {
      rotate: 90deg;
    }
  }

  &__content {
    margin-top: 10px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    overflow: hidden;
    max-height: 400px;
    transition: max-height 0.2s, margin-top 0.2s;

    &_collapsed {
      max-height: 0;
      margin-top: 0;
    }

    .icon-next__top,
    .icon-next__bottom {
      align-self: center;
      margin: 0.5em 0;
      font-size: 1rem;
      color: $gray-400;
    }

    .active {
      color: $white;
    }
  }

  &__content-wrap {
    max-height: inherit;
    border-width: 0 20px;
    border-color: $primary;
    border-radius: 20px;
    overflow: hidden scroll;
    border-style: solid;
  }

  &__divider {
    border-top: 1px $white solid;
  }
}
</style>
