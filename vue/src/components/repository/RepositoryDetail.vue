<template>
  <td>{{ repositoryName }}</td>
  <td>{{ details?.repositoryDescription }}</td>
  <td>{{ (new Date(details?.lastModifiedDate)).toLocaleDateString() }}</td>
  <td>
    <button type="button" class="btn btn-primary position-relative" v-if="nbPrOpen > 0">
      Pull Request
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {{ nbPrOpen }}
    <span class="visually-hidden">Pull request à valider</span>
  </span>
    </button>
  </td>
</template>

<script setup>
import {computed, defineProps, onMounted} from "vue";
import {useGitStore} from "@/store/git.store";

const props = defineProps(['repository']);



const store = useGitStore();

const repositoryName = '' + props.repository.name;
onMounted(() => {
  store.loadRepositoryDetails(repositoryName);
})


const details = computed(() => store.repositoryDetails(repositoryName));
const nbPrOpen = computed(() => (store.openPullRequestsByRepository(repositoryName) ?? []).length)
</script>

<style scoped>

</style>
