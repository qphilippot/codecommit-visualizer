<script setup>
import {computed, defineProps} from "vue";
import SideBarEntry from "@/components/sidebar/SideBarEntry";
import {useSidebarStore} from "@/store/dashboard.store";

const store = useSidebarStore();

const props = defineProps({
  currentRoute: {
    type: String,
    required: false,
    default: ''
  },

  width: {
    type: Number,
    required: false,
    default: 280
  }
});

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

const toggle = function () {
  if (props.width > 0) {
    return store.hide();
  }

  store.show();
}

const isOpen = computed(() => {
  return props.width > 0
});
</script>

<template>

  <div

      class="d-flex flex-column flex-shrink-0 text-white bg-dark sidebar"
      :style="'width: ' + props.width +'px'"
  >
    <Transition name="fade">
      <div  v-if="isOpen">
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
    </Transition>
  </div>


  <div
      class="toggle-btn"
      :class="{ close: !isOpen }"
      :style="'left:' + Math.max(props.width - 30, 0) + 'px'"
      @click="toggle()"
  >
    <i
        class="fa-solid fa-angle-right"
        :class="isOpen ? '' : 'rotate-180'"
    ></i>
  </div>
</template>

<style scoped>
.sidebar {
  transition: width 0.7s;
  overflow: hidden;
}
hr {
  margin: 35px 0;
}

.toggle-btn {
  position: fixed;
  height: 32px;
  top: calc(51px);
  z-index: 10;
  width: 30px;
  border-radius: 10px 0 0 10px;
  color: white;
  user-select: none;
  border: 1px solid #585b5e;
  background: #212529;
  transition: left 0.7s, border-radius 0.7s;
}

.toggle-btn.close {
  left: 0;
  border-radius: 0 10px 10px 0;
  border-left: none;
}

.toggle-btn > i {
  width: 32px;
  height: 32px;
  line-height: 30px;
  transform: rotate(180deg);
  transition: transform 0.7s;
}

.toggle-btn > i.rotate-180 {
  transform: rotate(0deg);
}

/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
