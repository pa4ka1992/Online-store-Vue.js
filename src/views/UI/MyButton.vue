<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>
<script lang="ts">
export default {
  name: 'my-button',
};
</script>
<style lang="scss">
@import "@/assets/scss/index.scss";

.btn {
  padding: 0.5rem 1rem;

  background-color: $primary;
  border: none {
    radius: 5px;
  }
}
</style>
