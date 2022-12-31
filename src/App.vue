<script setup>
import {onMounted} from "vue";
import {useGitStore} from "@/store/git.store";
import { useSidebarStore } from "@/store/dashboard.store";
import SideBar from "@/components/sidebar/SideBar";


import { useRoute } from "vue-router";
const route = useRoute();

const sidebarStore = useSidebarStore();
const gitStore = useGitStore();
onMounted(() => {
  gitStore.refresh();
})
</script>

<template>
  <div id="page-content">
    <SideBar
        :currentRoute="route.name"
        :width="sidebarStore.sidebarWidth"
    ></SideBar>
    <router-view></router-view>
  </div>
</template>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#page-content {
  display: flex;
}
</style>

