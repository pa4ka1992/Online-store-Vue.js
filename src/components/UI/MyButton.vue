<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'MyButton',
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.my-button {
  flex-grow: 0;
  display: inline-block;
  padding: 0.5rem 1rem;
  font: {
    family: 'Poppins', sans-serif;
    size: 1.1rem;
    weight: 500;
  }
  color: $light;
  background-color: $primary;
  border: none {
    radius: 5px;
  };
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.2s;

  &:hover {
    background-color: $primary-dark;
  }

  &:active {
    transform: scale(0.96);
  }
}
</style>
