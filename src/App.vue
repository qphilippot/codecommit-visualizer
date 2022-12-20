<template>
  <div id="app-content" class="container">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>

  <FooterLayout></FooterLayout>
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
import FooterLayout from "@/components/pages/layout/FooterLayout";
import {onMounted} from "vue";
import { useGitStore } from "@/store/git.store";
const gitStore = useGitStore();
onMounted(() => {
  gitStore.refresh();
})
</script>
