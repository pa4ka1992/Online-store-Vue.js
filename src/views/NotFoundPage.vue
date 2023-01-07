<template>
<div class="not-found">
  <h1 class="not-found__heading">404</h1>
  <h2 class="not-found__desc">Page not found</h2>
</div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.not-found {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__heading {
    font-size: 5rem;
    user-select: none;
    font-family: 'Pacifico', cursive;
    margin: 0;
    margin-bottom: 10px;
  }

  &__desc {
    user-select: none;
    font-weight: 300;
    font-size: 2rem;
    margin: 0;
  }
}

</style>