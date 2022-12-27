import { createApp } from 'vue'
import App from './App.vue'
import { createPinia} from "pinia";
import {createRouter, createWebHashHistory} from "vue-router";

import MainPage from './pages/MainPage';
import PullRequestDetail from './pages/PullRequestDetail';
import ReviewingPage from './pages/ReviewingPage'
const app = createApp(App);
app.use(createPinia());
import {useGitStore} from "@/store/git.store";
const gitStore = useGitStore();

app.use(createRouter({
   history: createWebHashHistory(),
   routes: [
       {
           path: '/',
           name: 'home',
           component: MainPage
       },
       {
           path: '/pull-request/:repository/:pullRequestId',
           name: 'review_pr',
           component: ReviewingPage,
           beforeEnter: to => {
              gitStore.loadDifferenceInvolvedByPullRequest(to.params)
               return true;
           },
           props: route => {
               return {
                   repository: route.params.repository,
                   pullRequestId: route.params.pullRequestId
               };
           }
       },
       {
           path: '/pull-request',
           name: 'open-pull-request',
           component: PullRequestDetail
       },
       {
           path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
           redirect: '/',
       }
   ]
}))
app.mount('#app')
