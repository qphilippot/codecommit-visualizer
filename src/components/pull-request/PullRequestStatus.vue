<script setup>
import { defineProps } from "vue";
const props = defineProps([ 'status']);
</script>


<template>
  <div v-if="props.status === 'OPEN'">
    <span class="badge rounded-pill text-bg-info">open</span>
  </div>

  <div v-else-if="props.status === 'MERGED'">
    <span class="badge rounded-pill text-bg-success">merged</span>
  </div>
  <div v-else-if="props.status === 'CLOSED'">
    <span class="badge rounded-pill text-bg-danger">closed</span>
  </div>
</template>

<style scoped>
.badge {
  color: white !important;
  text-transform: uppercase;
  font-weight: 500;
}

</style>
