<script lang="ts" setup>

import { ref, type Ref, computed } from 'vue';

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
    paddingTop: `${ top.value }px`,
    paddingBottom: `${ bottom.value }px`,
  }
})

</script>

<template>
  <div class="app-body"> 
    <div class="app-body__wrap"  :style="{ marginBottom: `-${top}px` }" ref="header"> 
      <slot name="header"></slot>
    </div>
    <main class="app-main" :style="mainStyles">
      <slot name="main"></slot>
    </main>
    <div class="app-body__wrap" :style="{ marginTop: `-${bottom}px` }" ref="footer"> 
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.app-body {
  background-color: $light;
}

.app-body__wrap {
  padding: 0;
  margin: 0;
  width: 100%;
}

.app-main {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
}

</style>