<template>
  <td>{{ repositoryName }}</td>
  <td>{{ details?.repositoryDescription }}</td>
  <td>{{ (new Date(details?.lastModifiedDate)).toLocaleDateString() }}</td>
</template>

<script setup>
import {computed, defineProps, onActivated, onMounted} from "vue";
import {useGitStore} from "@/store/git.store";
const props = defineProps(['repository']);


console.log('here')
const store = useGitStore();

const repositoryName = '' + props.repository.name;
onMounted(() => {
  console.log('onMounted')
  store.loadRepositoryDetails(repositoryName);
})

onActivated(() => {
  console.log('onActivated')
  store.loadRepositoryDetails(props.repository.name);
})

const details = computed(() => store.repositoryDetails(repositoryName));
</script>

<style scoped>

</style>
