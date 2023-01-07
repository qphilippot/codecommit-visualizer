<script setup>
import {defineProps} from "vue";

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
    <section>
      <div
          class="content"
          :class="props.usePadding ? 'reduced' : 'w-100'"
      >
        <slot name="content"></slot>
      </div>
    </section>
  </div>


</template>

<style scoped>
.content {
  background: white;
  margin: auto;
  position: relative;
  margin-top: 100px;
  padding: 40px 2%;
  width: 100%;
}

@media (min-width: 1400px) {
  .reduced {
    width: 85%;
  }
}

@media (min-width: 1200px) and (max-width: 1400px) {
  .reduced {
    width: 95%;
  }
}

@media (min-width: 1200px) {
  .reduced {
    border-radius: 5px;
  }
}

@media (max-width: 1200px) {
  .reduced {
    width: 100%;
  }
}
</style>
