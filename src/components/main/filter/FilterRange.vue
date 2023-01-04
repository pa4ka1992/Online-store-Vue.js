<script lang="ts" setup>
import { type Ref, ref, computed, watch } from 'vue';
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
  (e: 'release'): void,
}>();

// Slider and thumb logic

// Slider bar
// =========================

const wrap: Ref<HTMLElement | null> = ref(null);

const sliderBarElement: Ref<HTMLElement | null> = ref(null);

const sliderbarWidth = computed(() => {
  return sliderBarElement.value?.offsetWidth ?? 0;
});

// Common
// ==========================

const stepLength = computed(() => {
  return (sliderbarWidth.value * props.step / (props.max - props.min));
})

function truncValue(value: number) {
  return value >= 0 ? (value <= sliderbarWidth.value ? value : sliderbarWidth.value) : 0;
}

function calcValue(value: number) {
  return Math.floor((truncValue(value)) / stepLength.value) * props.step + props.min;
}

function calcPos(value: number) {
  return value / props.step * stepLength.value;
}

const _leftPos = ref(calcPos(props.left)); 
const _rightPos = ref(calcPos(props.right));

watch(props, () => {
  if (!active.value) { 
    _leftPos.value = calcPos(props.left);
    _rightPos.value = calcPos(props.right); 
  }
})

// Thumbs
// =========================

const thumbLeftElement: Ref<HTMLElement | null> = ref(null);

const thumbRightElement: Ref<HTMLElement | null> = ref(null);

const active: Ref<keyof PosMap | null> = ref(null);

const leftPos = computed({
  get() {
    if (active.value) return truncValue(_leftPos.value);
    else return calcPos(props.left);
  },
  set(value) {
    _leftPos.value = value;
    emits('update:left', calcValue(value));
  }
});

const rightPos = computed({
  get() {
    if (active.value) return truncValue(_rightPos.value);
    else return calcPos(props.right);
  },
  set(value) {
    _rightPos.value = value;
    emits('update:right', calcValue(value));
  }
});

type PosMap = {
  left: {
    raw: Ref<number>,
    prop: Ref<number>,
  },
  right: {
    raw: Ref<number>,
    prop: Ref<number>,
  }
}

const map: PosMap = {
  left: {
    raw: _leftPos,
    prop: leftPos,
  },
  right: {
    raw: _rightPos,
    prop: rightPos,
  }
}

function windowRelease() {
  active.value = null;
  document.body.style.cursor = 'auto';
  if (wrap.value) wrap.value.style.cursor = 'grab';
  
  window.removeEventListener('mousemove', windowMove);
  window.removeEventListener('mouseup', windowRelease);
  _leftPos.value = calcPos(props.left);
  _rightPos.value = calcPos(props.right);
  emits('release');
}

function windowMove(e: MouseEvent) {
  const pos = e.movementX;
  if (!active.value) throw new Error('Active element cant be null!');

  map[active.value].prop.value = map[active.value].raw.value + pos;

  if (leftPos.value > rightPos.value) {
    const oldVal = rightPos.value;
    rightPos.value = leftPos.value;
    leftPos.value = oldVal;

    if (active.value === 'left') active.value = 'right'; 
    else active.value = 'left';
  }
}

function thumbHold(e: MouseEvent) {
  e.preventDefault();

  const pos = e.offsetX;
  const leftLength = Math.abs(pos - leftPos.value);
  const rightLength = Math.abs(pos - rightPos.value);
  
  // Set closest as active slider
  if (leftLength < rightLength) { 
    active.value = 'left'; 
  } else {
    active.value = 'right'; 
  }

  map[active.value].prop.value = pos;

  document.body.style.cursor = 'grabbing';
  if (wrap.value) wrap.value.style.cursor = 'grabbing';
  window.addEventListener('mousemove', windowMove);
  window.addEventListener('mouseup', windowRelease);
}

// Fillbar
// ===============

const fillBarStyle = computed(() => {
  return {
    left: `${leftPos.value}px`, 
    width: `${fillBarWidth.value}px` 
  };
});

const fillBarWidth = computed(() => {
  return rightPos.value - leftPos.value;
});

function preventDrag(e: Event) {
  e.preventDefault()
}

</script>

<template>
<div class="double-slider" @mousedown="thumbHold" ref="wrap"> 
  <div class="double-slider__bar" @mousedown="preventDrag"  ref="sliderBarElement"></div>
  <div class="double-slider__fill-bar" @mousedown="preventDrag" :style="fillBarStyle"></div>
  <div class="double-slider__thumb" @mousedown="preventDrag" :style="{ left: `${leftPos}px` }" ref="thumbLeftElement"></div>
  <div class="double-slider__thumb" @mousedown="preventDrag" :style="{ left: `${rightPos}px` }" ref="thumbRightElement"></div>
</div>
</template>

<style lang="scss" scoped>

$inner-padding: 10px;
$thumb-width: 20px;
$bar-width: 4px;
$fill-bar-width: 6px;

@import "@/assets/scss/variables.scss";

.double-slider {
  margin: 10px calc(10px + $inner-padding);
  padding: $inner-padding 0; 
  position: relative;
  cursor: grab;

  &__bar {
    pointer-events: none;
    border-radius: 2px;
    border: $gray-200 calc($bar-width / 2) solid;
  }

  &__fill-bar {
    pointer-events: none;
    top: calc($inner-padding + $bar-width / 2 -  $fill-bar-width / 2);
    position: absolute;
    border-radius: 2px;
    border: $white calc($fill-bar-width / 2) solid;
  }

  &__thumb {
    pointer-events: none;
    width: $thumb-width;
    height: $thumb-width;
    position: absolute;
    top: calc($inner-padding + $bar-width / 2 -  $thumb-width / 2);
    background-color: $white;
    border: $primary-dark 3px solid;
    border-radius: 50%;
    translate: -50% 0;
  }
}

</style>