<script setup>
import RepositoryList from './components/repository/RepositoryList'
import { useGitStore } from "@/store/git.store";
import { onMounted } from "vue";

const store = useGitStore();

 onMounted(async() => {
  await store.refreshRepositoriesList();
});

const repositories = store.repositories;
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <RepositoryList :repositories="repositories" />
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
