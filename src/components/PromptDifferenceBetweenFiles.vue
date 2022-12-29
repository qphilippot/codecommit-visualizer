<script setup>
import {computed, defineProps} from "vue";
import { useGitStore } from "@/store/git.store";
const gitStore = useGitStore();
const props = defineProps(['mode', 'repository', 'before', 'after']);
import { CodeDiff } from "v-code-diff";

function initializeContent(blobId) {
  if (typeof blobId === 'undefined') {
    return '';
  }

  gitStore.loadContent(blobId, props.repository);
  return computed(() => {
      return gitStore.contentById(blobId, props.repository);
    });
}

function getNamedMode(mode) {
  if (mode === 'A') {
    return 'add';
  }

  if (mode === 'D') {
    return 'delete';
  }

  return 'modify'
}

const leftContent = initializeContent(props?.before?.blobId);
const rightContent = initializeContent(props?.after?.blobId);
const modeClass = getNamedMode(props.mode) + '-file';

</script>
<template>
  <div class="file-diff-group list-group-item list-group-item-action d-flex gap-3 py-3 px-0">
    <div class="container-fluid">
      <div class="row">
        {{ props.mode }}
      </div>

      <code-diff
          :old-string="leftContent"
          :new-string="rightContent"
          :noDiffLineFeed=true
          file-name="diff"
          :renderNothingWhenEmpty=true
          output-format="side-by-side"
          :class="modeClass"
      ></code-diff>
    </div>
  </div>
</template>


<style >
/* override code-diff style */
.add-file .d2h-file-side-diff:nth-child(1),
.delete-file .d2h-file-side-diff:nth-child(2)
{
  flex: 0;
}
.add-file .d2h-file-side-diff:nth-child(2),
.delete-file .d2h-file-side-diff:nth-child(1)
{
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
