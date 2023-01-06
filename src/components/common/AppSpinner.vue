<script lang="ts">
export default {
  name: 'AppSpinner',
};
</script>

<template>
<div class="spinner-wrap">
  <i class="icon-spinner spinner"></i>
</div>
</template>
<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

@keyframes spin {
  0% {
    rotate: 0deg;
  }

  100% {
    rotate: 359deg;
  }
}

.spinner {
  color: $primary-dark;
  &::before {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  font-size: 3.5rem;
  width: 200px;
  height: 200px;
  animation: spin 0.5s infinite linear;
}

.spinner-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

</style>