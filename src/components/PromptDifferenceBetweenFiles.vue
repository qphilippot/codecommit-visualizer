<script setup>
import { defineProps } from "vue";
const props = defineProps(['mode', 'before', 'after']);
import { CodeDiff } from "v-code-diff";
</script>
<template>
  <div class="file-diff-group list-group-item list-group-item-action d-flex gap-3 py-3 px-0">
    <div class="container-fluid">
      <div class="row">
        {{ props.mode }}
      </div>
    <template v-if="props.mode === 'A' || props.mode === 'D'">
      <code-diff
          :old-string="JSON.stringify(props.before, null, 4)"
          :new-string="JSON.stringify(props.after, null, 4)"
          :trim=true
          :noDiffLineFeed=true
          file-name="diff"
          :renderNothingWhenEmpty=true
          output-format="side-by-side"
          class="add-file"
      ></code-diff>
    </template>

    <template v-else>
        <div class="w-100">
          <code-diff
            :old-string="JSON.stringify(props.before, null, 4)"
            :new-string="JSON.stringify(props.after, null, 4)"
            :trim=true
            :noDiffLineFeed=true
            file-name="diff"
            output-format="side-by-side"
          ></code-diff>
        </div>

    </template>
    </div>
  </div>
</template>


<style >
.add-file .d2h-file-side-diff:nth-child(1) {
  flex: 0;
}
.add-file .d2h-file-side-diff:nth-child(2) {
  flex:1;
}
.d2h-file-side-diff {
  overflow: auto;
}

.hljs-string {
  line-height: 1.2rem;
  font-size: 1.2rem;
}
</style>
