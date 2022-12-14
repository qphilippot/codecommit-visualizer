<template>
  <table class="table">
    <caption>Liste des repositories git visibles</caption>
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

<script setup>
import {defineProps} from "vue";
import RepositoryDetail from "@/components/repository/RepositoryDetail";
const props = defineProps(['repositories']);

</script>
