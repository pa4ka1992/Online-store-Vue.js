<script lang="ts" setup>

import GithubLink from './GithubLink.vue';

import { ref } from 'vue';

const year = ref((new Date()).getFullYear());

</script>

<template> 
  <footer v-once class="page-footer">
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
  background-color: $primary2;
  color: $black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.course-link {
  &__logo {
    width: 160px;
    height: 80px;
  }
}

.year {
  font-size: 1.5rem;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  align-self: center;
  text-align: center;
}

.authors-section {
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