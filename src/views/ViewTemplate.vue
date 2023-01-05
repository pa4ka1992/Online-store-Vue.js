<script lang="ts" setup>
import { FadeTransition } from '@/components/common';
</script>
<template>
<RouterView v-slot="{ Component }">
  <FadeTransition>
    <component :is="Component"/>
  </FadeTransition>
</RouterView>
</template>