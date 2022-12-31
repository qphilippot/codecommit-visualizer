<script setup>
import GoBack from "@/components/GoBack";
import {useGitStore} from "@/store/git.store";
import {computed} from "vue";
import {useRouter} from "vue-router";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import PullRequestStatus from "@/components/pull-request/PullRequestStatus";
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
      <table class="table">
        <caption>Listing des pull request détectées pour ce compte</caption>
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Repository</th>
          <th scope="col">Titre</th>
          <th scope="col">Description</th>
          <th scope="col">Dernière modification</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>

        </thead>
        <tbody>
        <tr v-for="pullRequest in allPullRequest" :key="pullRequest._id">
          <td>{{ pullRequest._id }}</td>
          <td>{{ pullRequest.repository }}</td>
          <td>{{ pullRequest.title }}</td>
          <td>
            <PullRequestStatus :status="pullRequest?.status"></PullRequestStatus>
          </td>
          <td>{{ pullRequest.description }}</td>
          <td>{{ pullRequest.created_at }}</td>
          <td>
            <button
                @click="goToReview(pullRequest)"
                role="link"
            >
              review
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </DashBoardLayout>


</template>
