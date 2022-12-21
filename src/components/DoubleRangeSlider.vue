<script lang="ts" setup>

import { type Ref, ref, computed } from 'vue';

// Props
// ===============

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  left: {
    type: Number,
    default: 0,
  },
  right: {
    type: Number,
    default: 100,
  }
});

const emits = defineEmits<{
  (e: 'update:left', value: number): void,
  (e: 'update:right', value: number): void,
}>();


// Slider and thumb logic

// Common
// ===============

function truncXValue(value: number) {
  const pos = sliderBar.value?.offsetLeft ?? 0;
  return value >= pos ? (value <= pos + sliderbarWidth.value ? value - pos : sliderbarWidth.value) : 0;
}

function calcValue(value: number) {
  return Math.round((truncXValue(value)) / stepLength.value) * props.step;
}

const leftPos = computed({
  get() {
    return props.left / props.step * stepLength.value;
  },
  set(value) {
    emits('update:left', calcValue(value));
  }
}); 

const rightPos = computed({
  get() {
    return props.right / props.step * stepLength.value;
  },
  set(value) {
    emits('update:right', calcValue(value));
  }
}); 

const stepLength = computed(() => {
  return (sliderbarWidth.value * props.step / (props.max - props.min));
})

// Slider bar
// ===============

const sliderBar: Ref<HTMLElement | null> = ref(null);
const sliderbarWidth = computed(() => {
  return sliderBar.value?.offsetWidth ?? 0;
});

// Thumbs
// ===============

const thumbLeft: Ref<HTMLElement | null> = ref(null);
const thumbRight: Ref<HTMLElement | null> = ref(null);

const thumbLeftStyle = computed(() => {
  return { 
    left: `${leftPos.value}px`,
  };
});

const thumbRightStyle = computed(() => {
  return { 
    left: `${rightPos.value}px`,
  };
});

enum ActiveThumb {
  left = 'left',
  right = 'right',
  both = 'both',
  none = 'none'
}

const active: Ref<ActiveThumb> = ref(ActiveThumb.none);

function windowRelease() {
  active.value = ActiveThumb.none;
  window.removeEventListener('mousemove', windowMove);
  window.removeEventListener('mouseup', windowRelease);
}

function windowMove(e: MouseEvent) {
  const pos = e.pageX - (thumbLeft.value?.offsetWidth ?? 0);
 
  let left = leftPos.value, right = rightPos.value;

  if (active.value === 'left') left = pos;
  else if (active.value === 'right') right = pos;

  if (left > right) {
    const oldVal = right;
    right = left;
    left = oldVal;
    if (active.value === 'left') active.value = ActiveThumb.right;
    else if (active.value === 'right') active.value = ActiveThumb.left;
  }

  leftPos.value = left;
  rightPos.value = right;
}

function thumbHold(e: MouseEvent) {
  e.preventDefault();
  const pos = e.pageX;
  const leftLength = Math.abs(pos - leftPos.value - (thumbLeft.value?.offsetWidth ?? 0) / 2);
  const rightLength = Math.abs(pos - rightPos.value - (thumbRight.value?.offsetWidth ?? 0) / 2);

  // Calculate closest slider
  if (leftLength < rightLength) {
    active.value = ActiveThumb.left;
  } 
  else {
    active.value = ActiveThumb.right; 
  }

  window.addEventListener('mousemove', windowMove);
  window.addEventListener('mouseup', windowRelease);
}

// Fillbar
// ===============

const fillBar: Ref<HTMLElement | null> = ref(null);

const fillBarStyle = computed(() => {
  return {
    left: `${leftPos.value + (thumbLeft.value?.offsetWidth ?? 0) / 2}px`, 
    width: `${fillBarWidth.value}px` 
  };
});

const fillBarWidth = computed(() => {
  return rightPos.value - leftPos.value;
});

</script>

<template>
<div class="double-slider"> 
  <div class="double-slider__bar" ref="sliderBar"></div>
  <div class="double-slider__fill-bar" @mousedown="(e) => e.preventDefault()" :style="fillBarStyle" ref="fillBar"></div>
  <div class="double-slider__thumb" @mousedown="thumbHold" :style="thumbLeftStyle" ref="thumbLeft"></div>
  <div class="double-slider__thumb" @mousedown="thumbHold" :style="thumbRightStyle" ref="thumbRight"></div>
</div>
</template>

<style lang="scss" scoped>

$inner-padding: 10px;
$thumb-width: 20px;
$bar-width: 4px;
$fill-bar-width: 6px;

@import "@/assets/scss/variables.scss";
.double-slider {
  margin: 10px;
  padding: $inner-padding; 
  position: relative;

  &__bar {
    border-radius: 2px;
    border: $secondary calc($bar-width / 2) solid;
  }

  &__fill-bar {
    top: calc($inner-padding + $bar-width / 2 -  $fill-bar-width / 2);
    position: absolute;
    border-radius: 2px;
    border: $primary calc($fill-bar-width / 2) solid;
  }

  &__thumb {
    cursor: grab;
    width: $thumb-width;
    height: $thumb-width;
    position: absolute;
    top: calc($inner-padding + $bar-width / 2 -  $thumb-width / 2);
    background-color: $primary;
    border-radius: 50%;

    &:hover,
    &:active {
      filter: saturate(50%);
    }
  }
}

</style>