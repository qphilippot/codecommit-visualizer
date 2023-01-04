<script setup>
import GoBack from "@/components/GoBack";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import {useGitStore} from "@/store/git.store";
import {computed, defineProps} from "vue";
import PromptDifferenceBetweenFiles from "@/components/PromptDifferenceBetweenFiles";
import PullRequestStatus from "@/components/pull-request/PullRequestStatus";
const gitStore = useGitStore();
const props = defineProps(['repository', 'pullRequestId']);
const changes = computed(() => gitStore.changes);

const repository = '' + props.repository;

const reviewedPullRequest = computed(() => {
  return gitStore.pullRequestByRepositoryAndId(props);
});

const hasConflict = computed(() => reviewedPullRequest.value?.conflict.length > 0)
const isOpen = computed(() => reviewedPullRequest.value?.status === 'OPEN')

function mergePullRequest() {
  if (!reviewedPullRequest.value) {
      return;
  }

  gitStore.mergePullRequest(
      reviewedPullRequest.value?._id,
      reviewedPullRequest.value?.repository
  );
}
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
      <template v-if="reviewedPullRequest">
      <PullRequestStatus :status="reviewedPullRequest.status" style="position: absolute; left:0; top:-30px"></PullRequestStatus>
      <div class="head-wrapper">
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
      </div>
      </template>

      <div v-for="change in changes" :key="change.path" class="file-diff-group list-group-item list-group-item-action d-flex gap-3 py-3">
        {{ change }}
      </div>

      <div v-if="hasConflict && changes.length === 0" style="width: 80%; margin: 40px auto; display: flex; align-items: center">
        <span style="float: left; font-size: 2.55rem; margin-right: 3%">🤔</span>
        <span style="text-align: left">
          Differences between the source branch and the destination branch cannot be displayed for this pull request. The branch specified as the destination branch includes all the changes in the branch specified as the source branch as well as additional changes. You might have mixed up which branch should be the source, and which branch should be the destination.
        </span>
      </div>

      <PromptDifferenceBetweenFiles
          v-for="change in changes"
          :key="change.path"
          :repository="repository"
          :mode="change.changeType"
          :before="change?.beforeBlob ?? ''"
          :after="change?.afterBlob ?? ''"
      ></PromptDifferenceBetweenFiles>

      <hr/>
      <section class="action">
        <button
            v-if="isOpen"
            :disabled=hasConflict
            style="font-size:1.25rem;
            margin-right: 40px"
            class="btn btn-success"
            @click="mergePullRequest"
        >
          merge
        </button>
      </section>
    </template>
  </DashBoardLayout>
</template>

<style scoped>

.action {
  text-align: right;
}
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
