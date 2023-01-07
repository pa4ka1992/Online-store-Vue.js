<script lang="ts" setup>

import AppLayout from '@/components/AppLayout.vue';
import AppHeader from '@/components/header';
import AppFooter from '@/components/footer';
import ViewTemplate from './views/ViewTemplate.vue';

</script>

<template>
  <AppLayout> 
    <template #header> 
      <AppHeader/> 
    </template>
    <template #main> 
      <ViewTemplate/>
    </template>
    <template #footer> 
      <AppFooter/> 
    </template>
  </AppLayout>
</template>