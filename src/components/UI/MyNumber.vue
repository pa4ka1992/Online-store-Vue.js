<template lang>
  <span> {{ tweened.number.toFixed(fixed) }} </span>
</template>

<script lang="ts">
export default {
  name: 'my-number',
};
</script>

<script lang="ts" setup>
import { gsap } from 'gsap';
import { onMounted, reactive, toRefs, watch } from 'vue';

const props = defineProps<{
  input: number;
  fixed: number;
}>();

const tweened = reactive({
  number: 0
});
const { input } = toRefs(props);

const tween = (newValue: number): void => {
  gsap.to(tweened, {
    duration: 0.4,
    number: newValue,
    ease: 'sine',
  });
};

watch(input, (newInput) => {
  tween(newInput);
});

onMounted(() => {
  tween(input.value)
})
</script>

<style lang="scss" scoped></style>
