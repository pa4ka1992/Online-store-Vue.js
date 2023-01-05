<script lang="ts" setup>

import GithubLink from './GithubLink.vue';

import { ref } from 'vue';

const year = ref((new Date()).getFullYear());

</script>

<template> 
  <footer class="page-footer">
    <a class="a course-link" href="https://rs.school/js">
      <img class="course-link__logo" src="https://rs.school/images/rs_school_js.svg"/>
    </a>
    <span class="year">
      @{{year}}.
      All rights reserved
    </span>
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
  background-color: $primary-dark;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.25);
}

.course-link {
  display: block;
  &__logo {
    display: block;
    width: 100px;
  }
}

.year {
  font-size: 1.2rem;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  align-self: center;
  text-align: center;
}

.authors-section {
  display: flex;
  align-items: center;

  &__heading {
    font-size: 1.5rem;
    margin: 0;
    font-family: 'Pacifico', cursive;
    font-weight: 300;
  }
}

</style>