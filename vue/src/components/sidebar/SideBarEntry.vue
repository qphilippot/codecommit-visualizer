<script setup>
import {defineProps} from "vue";

const props = defineProps(['isSelected', 'routeName']);
</script>

<template>
  <router-link
      :to="{ name:  props.routeName}"
      :class="props.isSelected ? 'nav-link active' : 'nav-link text-white'"
      :aria-current="props.isSelected ? 'page' : ''"
  >
    <div class="icon-container">
      <slot name="icon"></slot>
    </div>
    <slot name="name"></slot>
  </router-link>
</template>

<style scoped>
li {
  text-align: left;
}

.icon-container {
  float: left;
  margin-right: 10px;
}

</style>
