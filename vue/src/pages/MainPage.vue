<script setup>
import RepositoryList from '@/components/repository/RepositoryList'
import {useGitStore} from "@/store/git.store";
import {computed, ref, watch} from "vue";
import { formatDate } from "../../../services/date.helper";
import OpenPullRequestInfoBanner from "@/components/pull-request/OpenPullRequestInfoBanner";
import DashBoardLayout from "@/components/layout/DashBoardLayout";

const store = useGitStore();
const repositories = store.repositories;
const formattedLastSync = ref('');

const lastRepositorySync = computed(() => store.lastSynchronize);
watch(
    lastRepositorySync,
    () => {
      formattedLastSync.value = formatDate(lastRepositorySync.value)
    }
);


async function onResyncAsked() {
  await store.refreshRepositoriesList();
}
</script>

<template>
  <DashBoardLayout>
    <template #alert-area>
      <OpenPullRequestInfoBanner></OpenPullRequestInfoBanner>
    </template>

    <template #content>
      <div class="content">
        <RepositoryList
            class="container content"
            :repositories="repositories"
            :lastResync="formattedLastSync"
            @askResync="onResyncAsked()"
        />
      </div>
    </template>
  </DashBoardLayout>
</template>

<style scoped>


</style>
