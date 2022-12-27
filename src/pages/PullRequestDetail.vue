<script setup>
import GoBack from "@/components/pages/widget/GoBack";
import {useGitStore} from "@/store/git.store";
import {computed} from "vue";
import {useRouter} from "vue-router";
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
  <GoBack></GoBack>
  <table class="table">
    <thead>
    <th scope="col">ID</th>
    <th scope="col">Repository</th>
    <th scope="col">Titre</th>
    <th scope="col">Description</th>
    <th scope="col">Dernière modification</th>
    <th scope="col">Status</th>
    <th scope="col">Actions</th>
    </thead>
    <tbody>
      <tr v-for="pullRequest in allPullRequest" :key="pullRequest._id">
        <th scope="row">{{ pullRequest._id }}</th>
        <th scope="row">{{ pullRequest.repository }}</th>
        <th>{{ pullRequest.title }}</th>
        <th>{{ pullRequest.status }}</th>
        <th>{{ pullRequest.description }}</th>
        <th>{{ pullRequest.created_at }}</th>
        <th>
          <button
              @click="goToReview(pullRequest)"
              role="link"
          >
            review
          </button>
        </th>
      </tr>
    </tbody>
  </table>
  <h1>Work in progress</h1>
  <section>
    {{ allPullRequest }}
  </section>
</template>
