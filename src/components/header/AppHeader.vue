<script lang="ts" setup>

import SearchBar from './SearchBar.vue';
import CartLink from './CartLink.vue';

import { ref } from 'vue';

const val = ref("");

function click() {
  console.log('Gotcha!', val.value);
}

</script>

<template> 
  <header class="page-header">
    <RouterLink class="a" to="/"> 
      <div class="logo">
        Online Store
      </div> 
    </RouterLink>
    <SearchBar @search="click" v-model="val"/>
    <CartLink/>
  </header>
</template>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss'; 

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 35px;
  background-color: $primary-dark;
  color: $white;

  @include apply-shadow;
}

.logo {
  user-select: none;  
  font-size: 2rem;
  font-family: 'Pacifico', cursive;

  transition: scale 0.5s;

  &:hover {
    scale: 1.2;
  }
}

</style>