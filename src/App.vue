<script lang="ts" setup>

import AppLayout from '@/components/AppLayout.vue';
import AppHeader from '@/components/header';
import AppFooter from '@/components/footer';

</script>

<template>
  <AppLayout> 
    <template #header> 
      <AppHeader/> 
    </template>
    <template #main> 
      <RouterView/>
    </template>
    <template #footer> 
      <AppFooter/> 
    </template>
  </AppLayout>
</template>