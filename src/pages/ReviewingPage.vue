<script setup>
import GoBack from "@/components/GoBack";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import {useGitStore} from "@/store/git.store";
import {computed, defineProps} from "vue";
import PromptDifferenceBetweenFiles from "@/components/PromptDifferenceBetweenFiles";
const gitStore = useGitStore();
const props = defineProps(['repository', 'pullRequestId']);
const changes = computed(() => gitStore.changes);

const repository = '' + props.repository;

const reviewedPullRequest = computed(() => {
  return gitStore.pullRequestByRepositoryAndId(props);
});

const hasConflict = computed(() => reviewedPullRequest.value?.conflict.length > 0)

</script>

<!--todo add arial label and caption -->
<template>
  <div>

  </div>
  <DashBoardLayout>
    <template #alert-area>
      <GoBack></GoBack>
    </template>
    <template #content>
      <div class="head-wrapper">
        <template v-if="reviewedPullRequest">
          <h1>
            {{ reviewedPullRequest.title }}
          </h1>
          <p>
            {{ reviewedPullRequest.description }}
          </p>

          <section class="tag-line">
            <button role="button" class="btn btn-danger conflict-btn" v-if="hasConflict">
              Conflict <span class="badge bg-secondary">{{ reviewedPullRequest.conflict.length }}</span>
            </button>
          </section>
        </template>
      </div>

      <div v-for="change in changes" :key="change.path" class="file-diff-group list-group-item list-group-item-action d-flex gap-3 py-3">
        {{ change }}
      </div>
      <PromptDifferenceBetweenFiles
          v-for="change in changes"
          :key="change.path"
          :repository="repository"
          :mode="change.changeType"
          :before="change?.beforeBlob ?? ''"
          :after="change?.afterBlob ?? ''"
      ></PromptDifferenceBetweenFiles>
    </template>
  </DashBoardLayout>
</template>

<style scoped>
.conflict-btn {
  font-weight: 600;
  font-size: 0.8rem;
  padding: 2px 5px;
}

.tag-line {
  margin: 20px 0;
  width: calc(100% - 40px);
  display: flex;
  justify-content: left;
}

.head-wrapper {
  width: 80%;
  margin: auto;
}
</style>
