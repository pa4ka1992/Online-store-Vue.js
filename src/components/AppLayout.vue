<script lang="ts" setup>
import { ref, type Ref, computed, watchPostEffect, onUpdated } from 'vue';

const mainPadding = 30;

const header: Ref<HTMLElement | null> = ref(null);

const footer: Ref<HTMLElement | null> = ref(null);

const top = ref(0);

const bottom = ref(0);

const updateOffests = (): void => {
  top.value = header.value?.offsetHeight ?? 0;
  bottom.value = footer.value?.offsetHeight ?? 0;
};

watchPostEffect(() => {
  updateOffests();
});

onUpdated(() => {
  updateOffests();
});

const mainStyles = computed(() => {
  return {
    paddingTop: `${top.value + mainPadding}px`,
    paddingBottom: `${bottom.value + mainPadding}px`,
  };
});
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
  position: fixed;
  z-index: 10;
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
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
