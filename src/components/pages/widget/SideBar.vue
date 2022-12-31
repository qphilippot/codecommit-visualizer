<script setup>
import {defineProps} from "vue";
import SideBarEntry from "@/components/pages/widget/SideBarEntry";

const props = defineProps(['currentRoute']);

const routing = [
  {
    routeName: 'home',
    icon: '<i class="fa-solid fa-book-bookmark"></i>',
    text: 'Repositories'
  },

  {
    routeName: 'open-pull-request',
    icon: '<i class="fa-solid fa-code-pull-request"></i>',
    text: 'Pull Request'
  }
];
</script>

<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <img alt="CodeCommitVisualizer logo" src="@/assets/codecommit.png" style="width:18px; margin-right: 5px">
      <span class="fs-5">CodeCommit-Visualizer </span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <SideBarEntry
            v-for="item in routing"
            :key="item.routeName"
            :is-selected="item.routeName === props.currentRoute"
            :route-name="item.routeName"
        >
          <template #icon>
            <span v-html="item.icon"></span>
          </template>
          <template #name>
            {{ item.text }}
          </template>
        </SideBarEntry>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
