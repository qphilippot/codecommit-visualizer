
<template>
<button @click="goBack">
  <i class="fa-solid fa-chevron-left"></i> back
</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = function () {
  router.back();
}
</script>

<style scoped>
button {
  background: none;
  border: none;
  float: left;
  margin-left: 50px;
  margin-top: 15px;
  font-size: 1.25rem;
}

button > i {
  margin-right: 5px;
}

</style>
