<script lang="ts">
export default {
  name: 'FadeTransition',
};
</script>

<template>
<Transition name="fade" mode="out-in">
  <slot></slot>
</Transition>
</template>

<style lang="scss">

.fade {
  &-leave-active,
  &-enter-active {
    translate: 0;
    transition: opacity 0.5s ease, translate 0.5s ease;
  }

  &-enter-from {
    translate: 20px 0;
    opacity: 0;
  }

  &-leave-to {
    opacity: 0;
    translate: -20px 0;
  }
}

</style>