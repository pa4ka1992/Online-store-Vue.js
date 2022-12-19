<script lang="ts" setup>

import { useTestStore } from '../store';

const store = useTestStore();

</script>

<template>
<div>
  <router-link to="/cart">cart</router-link>
  <h1> Counter is {{store.count}}</h1>
  <button class="btn btn-primary" @click="store.increment()">Click me!</button>
</div>

</template>