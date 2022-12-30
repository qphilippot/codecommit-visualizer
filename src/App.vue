<template>
  <div id="app-content" class="container-fluid">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}

</style>
<script setup>
import {onMounted} from "vue";
import {useGitStore} from "@/store/git.store";

const gitStore = useGitStore();
onMounted(() => {
  gitStore.refresh();
})
</script>
