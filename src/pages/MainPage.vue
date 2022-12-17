<script setup>
import RepositoryList from '@/components/repository/RepositoryList'
import { useGitStore } from "@/store/git.store";
import {computed, onMounted, ref, watch} from "vue";
import OpenPullRequestInfoBanner from "@/components/pull-request/OpenPullRequestInfoBanner";

const store = useGitStore();

onMounted(async() => {
  if (store.lastSynchronize < Date.now() + 600000) {
    await store.refreshRepositoriesList();
  }
});

const repositories = store.repositories;
const formattedLastSync = ref('');

const lastRepositorySync =  computed(() => store.lastSynchronize);
watch(
    lastRepositorySync,
    () => {
      formattedLastSync.value = formatDate(lastRepositorySync.value)
    }
);


function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString()
}

async function onResyncAsked() {
  await store.refreshRepositoriesList();
}
</script>

<template>
    <OpenPullRequestInfoBanner></OpenPullRequestInfoBanner>

    <RepositoryList
        :repositories="repositories"
        :lastResync="formattedLastSync"
        @askResync="onResyncAsked()"
    />
</template>
