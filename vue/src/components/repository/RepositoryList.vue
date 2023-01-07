<template>
  <table class="table">
    <caption>
      Liste des repositories git visibles.
      <small>Dernière synchronisation : {{ props.lastResync }}</small>
      <span @click="$emit('askResync')">refresh</span>
    </caption>
    <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Description</th>
      <th scope="col">Dernière modification</th>
      <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="repository in props.repositories" :key="repository.id">
      <RepositoryDetail :repository="repository"/>
    </tr>
  </tbody>
  </table>
</template>

<style scoped>
  small {
    font-size: 0.8rem;
    font-style: italic;
  }
</style>
<script setup>
import {defineProps} from "vue";
import RepositoryDetail from "@/components/repository/RepositoryDetail";
const props = defineProps(['repositories', 'lastResync']);

</script>
