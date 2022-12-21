<script lang="ts" setup>

import { ref, type Ref, computed } from 'vue';

const header: Ref<HTMLElement | null> = ref(null);

const footer: Ref<HTMLElement | null> = ref(null);

const mainStyles = computed(() => {
  return {
    paddingTop: `${ header.value?.offsetHeight ?? 0}px`,
    paddingBottom: `${ footer.value?.offsetHeight ?? 0}px`,
  }
})

</script>

<template>
  <div class="app-body"> 
    <div class="app-header-wrap" ref="header"> 
      <slot name="header"></slot>
    </div>
    <main class="app-main" :style="mainStyles">
      <slot name="main"></slot>
    </main>
    <div class="app-footer-wrap" ref="footer"> 
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.app-body {
  position: relative;
  background-color: $light;
}

.app-header-wrap {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.app-main {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
}

.app-footer-wrap {

}

</style>