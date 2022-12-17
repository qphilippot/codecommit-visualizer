<script setup>
import { useGitStore } from "@/store/git.store";
const store = useGitStore();
const openPR = store.openPullRequests;

</script>

<template>
  <div  v-if="openPR.length > 0" class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>{{ openPR.length }}</strong> pull requests en attentes de validations sur {{ (new Set(openPR.map(pr => pr.pullRequestTargets?.[0].repositoryName ))).size }} repos
    <router-link :to="{ name: 'open-pull-request'}">see more</router-link>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>
