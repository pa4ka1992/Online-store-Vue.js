<script lang="ts" setup>
import { ref, type Ref, computed, onUpdated } from 'vue';

const props = defineProps<{
  title: string;
}>();

const collapsed = ref(true);

const isOnTop = ref(true);

const isOnBottom = ref(false);

const contentElement: Ref<HTMLElement | null> = ref(null);

const scrollHeight = computed(() => {
  return contentElement.value?.scrollHeight ?? 0;
})

function onScroll() {
  const top = contentElement.value?.scrollTop ?? 0;
  const clientHeight = contentElement.value?.clientHeight ?? 0;
  isOnTop.value = top === 0;
  isOnBottom.value = scrollHeight.value - clientHeight - top === 0;
}

const height = 400;

const scrollHide = ref(true);

onUpdated(() => {
  scrollHide.value = scrollHeight.value > height;
});

const contentStyle = computed(() => {
  const obj = collapsed.value ? {
    maxHeight: `0px`,
    marginTop: `0`,
  } : {};
  return {
    maxHeight: `${height}px`,
    ...obj
  }
});
</script>

<template>
  <section class="filter-dropdown">
    <div class="filter-dropdown__head" @click="collapsed = !collapsed">
      <h4 class="filter-dropdown__title">{{ title }}</h4>
      <button class="btn filter-dropdown__button" :class="!collapsed ? 'filter-dropdown__button_active' : ''">
        <i class="icon-next btn__icon"></i>
      </button>
    </div>

    <section 
      class="filter-dropdown__content"
      :style="contentStyle">
      <span class="filter-dropdown__divider"></span>
      <font-awesome-icon
        v-if="scrollHide"
        class="icon-next icon-next__top"
        :class="{ active: !isOnTop }"
        icon="fa-solid fa-angles-up"
      />
      <div class="filter-dropdown__content-wrap" ref="contentElement" @scroll="onScroll">
        <slot></slot>
      </div>
      <font-awesome-icon
        v-if="scrollHide"
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

.btn__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.5em;

  &::before {
    transition: rotate 0.2s ease;
    rotate: 90deg; 
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
    filter: brightness(105%);
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
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;

    &_active {
      .btn__icon {
        &::before {
          rotate: -90deg;
        }
      }
    }
  }

  &__content {
    margin-top: 10px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    overflow: hidden;
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
    padding: 0 20px;
    border-radius: 20px;
    overflow: hidden scroll;
  }

  &__divider {
    border-top: 1px $white solid;
  }
}
</style>
