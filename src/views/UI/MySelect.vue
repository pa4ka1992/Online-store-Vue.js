<template>
  <select class="form-select form-select-sm" :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите количество</option>
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
</template>
<script lang="ts">
export default {
  name: 'my-select',
};
</script>
<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
    requared: true,
  },
  options: {
    type: Number,
    requared: true,
  },
});
const emit = defineEmits(['update']);
const changeOption = ({ target }: Event): void => {
  emit('update', (target as HTMLOptionElement).value);
};
</script>
<style lang="scss"></style>
