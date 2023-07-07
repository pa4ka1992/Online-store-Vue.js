<script lang="ts" setup>

import DoubleRangeSlider from '@/components/DoubleRangeSlider.vue';
import { useTestStore } from '../store';
import { ref } from 'vue';

const store = useTestStore();


const left = ref(0);
const right = ref(50);

</script>

<template>
<div>
  <router-link to="/cart">cart</router-link>
    <router-link to="/product/iphone/id/34">product</router-link>
  <h1> Counter is {{store.count}}</h1>
  <button class="btn btn-primary" @click="store.increment()">Click me!</button>
  <double-range-slider :step=10 v-model:left="left" v-model:right="right"></double-range-slider>
</div>

</template>