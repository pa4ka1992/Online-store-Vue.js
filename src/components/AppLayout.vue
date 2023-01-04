<script lang="ts" setup>

import { ref, type Ref, computed } from 'vue';

const mainPadding = 30;

const header: Ref<HTMLElement | null> = ref(null);

const footer: Ref<HTMLElement | null> = ref(null);

const top = computed(() => {
  return header.value?.offsetHeight ?? 0;
});

const bottom = computed(() => {
  return footer.value?.offsetHeight ?? 0;
});

const mainStyles = computed(() => {
  return {
    paddingTop: `${ top.value + mainPadding }px`,
    paddingBottom: `${ bottom.value + mainPadding }px`,
  }
})

</script>

<template>
  <div class="app-body"> 
    <div class="app-body__header" ref="header"> 
      <slot name="header"></slot>
    </div>
    <main class="app-main" :style="mainStyles">
      <slot name="main"></slot>
    </main>
    <div class="app-body__footer" ref="footer"> 
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.app-body {
  background-color: $light;
  font-family: 'Poppins', sans-serif;
  position: relative;
}

.app-body__header {
  padding: 0;
  margin: 0;
  width: 100%;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}

.app-body__footer {
  padding: 0;
  margin: 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.app-main {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
}

</style>