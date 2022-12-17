import { createApp } from 'vue'
import App from './App.vue'
import { createPinia} from "pinia";
import {createRouter, createWebHashHistory} from "vue-router";

import MainPage from './pages/MainPage';
import PullRequestDetail from './pages/PullRequestDetail';
const app = createApp(App);
app.use(createPinia());
app.use(createRouter({
   history: createWebHashHistory(),
   routes: [
       {
           path: '/',
           name: 'home',
           component: MainPage
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
