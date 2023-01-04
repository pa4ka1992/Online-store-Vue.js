<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
  }
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <label
    :class="modelValue ? 'filter-checkbox__checked' : ''"
    class="filter-checkbox"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <slot></slot>
  </label>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.filter-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  &:hover {
    &::before {
      background-color: $primary-light;
    }
  }

  &::before {
    display: inline-block;
    transition: background-color 0.5s;
    content: '';
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: $white;
    margin-right: 10px;
  }

  &::after {
    content: '';
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    position: absolute;
    rotate: 45deg;
    width: 4px;
    height: 10px;
    top: 5px;
    left: 10px;
    display: none;
  }

  &__checked {
    &::before {
      background-color: $primary;
    }

    &::after {
      display: inline-block;
    }
  }
}
</style>
