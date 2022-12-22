<template>
  <select class="select" :value="limit" @change="changeOption">
    <option class="option" v-for="option in maxLimit" :key="option" :value="option">{{ option }}</option>
  </select>
</template>
<script lang="ts">
export default {
  name: 'my-select',
};
</script>
<script lang="ts" setup>
import { Ref } from 'vue';

const props = defineProps<{
  limit: Ref<number>
  maxLimit: number 
}>();
const emit = defineEmits(['update']);
const changeOption = ({ target }: Event): void => {
  emit('update', (target as HTMLOptionElement).value);
};
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';

.select {
  padding: 0.3em 0.6rem;
  font: {
    family: 'Poppins', sans-serif;
    size: 1rem;
    weight: 500;
  }
  border: none {
    radius: 10px;
  }
  outline: 2px solid $secondary;
  transition: all 0.2s;

  &:focus-visible {
    outline-color: $primary;
  }
}
</style>
