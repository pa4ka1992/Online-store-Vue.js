<script lang="ts" setup>
</script>

<template> 
  <main class="app-body">
    <i class="demo-icon icon-cart-no"></i>
    <i class="demo-icon icon-cart-ok"></i>
    <i class="demo-icon icon-cart-plus"></i>
    <i class="demo-icon icon-cart"></i>
    <RouterView/>
  </main>  
</template>

<style scoped>

.demo-icon {
  font-size: 50px;
}

.app-body {
  min-height: 100vh;
}
</style>