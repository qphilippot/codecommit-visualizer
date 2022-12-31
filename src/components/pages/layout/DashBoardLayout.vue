<script setup>
import { defineProps } from "vue";
const props = defineProps({
  usePadding: {
    type: Boolean,
    required: false,
    default: true
  }
});
</script>
<template>
  <div class="w-100">
    <slot name="alert-area"></slot>
    <section class="container-fluid">
      <div
          class="content"
          :class="props.usePadding ? 'w-85' : 'w-100'"
      >
        <slot name="content"></slot>
      </div>
    </section>
  </div>


</template>

<style scoped>
.content {
  background: white;
  padding: 40px;
  border-radius: 5px;
  margin: auto;
  margin-top: 100px;
}
.w-85 {
  width: 85%;
}
</style>
