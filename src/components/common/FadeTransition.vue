<template>
<Transition name="fade" mode="out-in">
  <slot></slot>
</Transition>
</template>

<style lang="scss">

.fade {
  &-leave-active,
  &-enter-active {
    transition: opacity 0.25s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

</style>