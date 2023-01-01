<script lang="ts" setup>

import GithubLink from './GithubLink.vue';

</script>

<template> 
  <footer class="page-footer">
    <a class="a course-link" href="https://rs.school/js">
      <img class="course-link__logo" src="https://rs.school/images/rs_school_js.svg"/>
    </a>
    <address class="authors-section">
      <h4 class="authors-section__heading">Website created by:</h4>
      <GithubLink name="RichGihratik"/>
      <GithubLink name="Pa4ka1992"/>
    </address>
  </footer>
</template>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss';

.page-footer {
  @include apply-shadow;
  background-color: $primary2;
  color: $black;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.course-link {
  margin: 20px;
  &__logo {
    width: 160px;
    height: 80px;
  }
}

.authors-section {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__heading {
    font-size: 1.5rem;
    margin: 0;
    font-family: 'Pacifico', cursive;
    font-weight: 300;
  }
}

</style>