<script lang="ts" setup>

import { ref } from 'vue';

const increment = ref(0);

</script>

<template> 

<div> 
  <h1> Counter is {{increment}}</h1>
  <button>Click me!</button>
</div>

</template>