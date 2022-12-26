<script lang="ts" setup>
import { computed, type Ref, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search'): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emits('update:modelValue', value);
  },
});

const inputBar: Ref<HTMLElement | null> = ref(null);

function startSearch() {
  if (inputBar.value !== null) {
    inputBar.value.blur();
  }
  emits('search');
}

function enterPress(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    startSearch();
  }
}
</script>

<template>
  <div class="search">
    <input
      placeholder="what are you looking for?"
      class="search__bar"
      ref="inputBar"
      type="text"
      @keypress="enterPress"
      v-model="value"
    />
    <button class="btn search__btn" @click="startSearch()">
      <i class="icon-search"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

$side-padding: 25px;
$border-radius: 100px;

.search {
  margin: 10px;
  position: relative;

  &__bar {
    padding: 10px 60px 10px $side-padding;
    font-size: 1rem;
    border: none;
    min-width: 480px;
    border-radius: $border-radius;
    outline: none;
    transition: background-color 0.5s;
    width: 100%;
    background-color: $primary;

    &:focus {
      background-color: $primary-light;
    }
  }

  &__btn {
    font-size: 2rem;
    position: absolute;
    padding-right: calc($side-padding / 2);
    right: -1px;
    top: 0;
    height: 100%;
    border-radius: 0 $border-radius $border-radius 0;
    box-sizing: content-box;
    transition: background-color 0.2s;
    background-color: transparent;

    &:hover {
      background-color: $primary2;
    }

    &:active {
      background-color: $primary2-dark;
    }
  }
}
</style>
