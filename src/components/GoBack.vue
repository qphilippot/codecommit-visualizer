
<template>
<button @click="goBack">go back</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = function () {
  router.back();
}
</script>

<style scoped>

</style>
