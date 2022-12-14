<script setup>
import RepositoryList from './components/repository/RepositoryList'
import { useGitStore } from "@/store/git.store";
import { onMounted } from "vue";

const store = useGitStore();

 onMounted(async() => {
  await store.refreshRepositoriesList();
});

const repositories = store.repositories;
const openPR = store.openPullRequests;
</script>

<template>
  <div class="container">
    <img alt="Vue logo" src="./assets/logo.png">
    <div  v-if="openPR.length > 0" class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>{{ openPR.length }}</strong> pull requests en attentes de validations sur {{ (new Set(openPR.map(pr => pr.pullRequestTargets?.[0].repositoryName ))).size }} repos

      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <RepositoryList :repositories="repositories" />
  </div>

</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
