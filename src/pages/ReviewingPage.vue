<script setup>
import GoBack from "@/components/pages/widget/GoBack";
import {useGitStore} from "@/store/git.store";
import {computed, defineProps} from "vue";
import PromptDifferenceBetweenFiles from "@/components/PromptDifferenceBetweenFiles";
const gitStore = useGitStore();
const props = defineProps(['repository', 'pullRequestId']);
const changes = computed(() => gitStore.changes);

const reviewedPullRequest = computed(() => {
  return gitStore.pullRequestByRepositoryAndId(props);
});

</script>

<!--todo add arial label and caption -->
<template>
  <GoBack></GoBack>
  <h1>

    <template v-if="reviewedPullRequest">
      {{ reviewedPullRequest.title }}
    </template>
  </h1>
  <section class="list-group">
    <div v-for="change in changes" :key="change.path" class="file-diff-group list-group-item list-group-item-action d-flex gap-3 py-3">
      {{ change }}
    </div>
    <PromptDifferenceBetweenFiles
        v-for="change in changes"
        :key="change.path"
        :mode="change.changeType"
        :before="change?.beforeBlob"
        :after="change?.afterBlob"
    ></PromptDifferenceBetweenFiles>
  </section>
</template>
<style scoped>
</style>
