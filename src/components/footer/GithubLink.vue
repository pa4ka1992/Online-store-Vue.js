<script setup lang="ts">

import { ref, type Ref } from 'vue';

const props = defineProps<{
  name: string
}>();

type GithubInfo = {
  avatar_url: string,
  html_url: string
}

const githubInfo: Ref<GithubInfo> = ref({avatar_url: '', html_url: ''})

fetch(`https://api.github.com/users/${props.name}`)
  .then((response) => response.json())
  .then((json: GithubInfo) => githubInfo.value = json);

</script>

<template>
<a class="a github-link" :href="githubInfo.html_url">
  <img class="github-link__avatar" :src="githubInfo.avatar_url"/>
  <span class="github-link__name">{{name}}</span>
</a>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.github-link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-left: 10px;

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    @include apply-shadow;
    margin-right: 10px;
    transition: scale 0.5s;
  }

  &:hover {
    .github-link__avatar {
      scale: 1.2;
    }
  }

  &__name {
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
  }

  &:nth-of-type(2) {
    margin-left: 30px;
  }
}

</style>