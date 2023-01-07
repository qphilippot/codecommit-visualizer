<script setup>
import GoBack from "@/components/GoBack";
import {useGitStore} from "@/store/git.store";
import {computed} from "vue";
import {useRouter} from "vue-router";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import PullRequestStatus from "@/components/pull-request/PullRequestStatus";
import { formatDate } from "../../../services/date.helper";

const gitStore = useGitStore();
const router = useRouter();

const allPullRequest = computed(() => gitStore.allPullRequests);

function goToReview(pullRequestObject) {
  router.push({
    name: 'review_pr',
    params: {
      repository: pullRequestObject.repository,
      pullRequestId: pullRequestObject._id
    }
  });
}
</script>

<!--todo add arial label and caption -->
<template>
  <DashBoardLayout>
    <template #alert-area>
      <GoBack></GoBack>
    </template>

    <template #content>
      <table class="table table-striped table-hover">
        <caption>Listing des pull request détectées pour ce compte</caption>
        <thead>
        <tr>
          <th scope="col" class="identifier">#</th>
          <th scope="col" class="repo">Repository</th>
          <th scope="col">Titre</th>
          <th scope="col">Status</th>
          <th scope="col" class="w-50">Description</th>
          <th scope="col">Dernière modification</th>
        </tr>

        </thead>
        <tbody>
        <tr
            v-for="pullRequest in allPullRequest"
            :key="pullRequest._id"
            style="cursor: pointer"
            @click="goToReview(pullRequest)"
        >
          <td class="identifier">{{ pullRequest._id }}</td>
          <td class="repo">{{ pullRequest.repository }}</td>
          <td>{{ pullRequest.title }}</td>
          <td class="tag">
            <PullRequestStatus :status="pullRequest?.status"></PullRequestStatus>
            <span class="badge text-bg-danger" v-if="pullRequest.conflict.length > 0">conflict</span>
          </td>
          <td class="w-50">{{ pullRequest.description }}</td>
          <td>{{ formatDate(pullRequest.created_at) }}</td>
        </tr>
        </tbody>
      </table>
    </template>
  </DashBoardLayout>
</template>

<style scoped>

table {
  table-layout: fixed;
}
.repo {
  width: 10%;
  max-width: 10%;
}
.identifier {
  font-size: 0.75em;
  font-style: italic;
  max-width: 65px;
  width: 32px;
}
.tag > *:nth-child(2) {
  margin-left: 5px;
}
tr {
  line-height: 2.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.w-50 {
  width: 50%;
  max-width: 50%;
}

button[role='link'] {
  background: none;
  border: none;
}
</style>
