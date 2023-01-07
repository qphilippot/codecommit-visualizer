<script setup>
import { defineProps } from "vue";
const props = defineProps([ 'status']);
</script>


<template>
    <span v-if="props.status === 'OPEN'" class="badge bg-primary">open</span>
    <span  v-else-if="props.status === 'MERGED'" class="badge text-bg-success">merged</span>
    <span v-else-if="props.status === 'CLOSED'" class="badge text-bg-secondary">closed</span>
</template>

<style scoped>
.badge {
  color: white !important;
}

</style>
