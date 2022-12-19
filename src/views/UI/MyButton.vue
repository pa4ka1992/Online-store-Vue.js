<template>
  <button class="btn btn-primary">
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
</style>
