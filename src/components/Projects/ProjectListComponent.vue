<template>
  <div class="projects_list-container">
    <div class="list">
      <ProjectListItemComponent
        v-for="(item, index) in list"
        :key="index + item.id"
        :data="item"
        v-model:active="item.active"
        v-model:lockedPreview="lockedPreview"
      />
    </div>
    <div class="col">
      <div class="section__title">
        <span class="number">02</span>
        <WavyTextComponent
          custom-class="content"
          text="Projects"
          bg-size="100px"
          bgPos="68%"
        />
      </div>
      <ModelWindowComponent
        v-model="animationList"
        canvas-class="tablet"
        container-class="tablet-container"
        :custom-class="lockedPreview ? 'lock_preview' : ''"
        modelPath="tablet1.glb"
        animation="tablet"
        :controls="true"
        :cameraPosition="{ x: 0, y: 3.7, z: 0 }"
        :modelPosition="{ x: 0, y: 0, z: 0 }"
        :videoSrc="list.find((el) => el.active == true)?.videoPath"
        :lockedPreview="lockedPreview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectListItemComponent from "./ProjectListItemComponent.vue";
import ModelWindowComponent from "../ModelWindowComponent.vue";
import WavyTextComponent from "../WavyText/WavyTextComponent.vue";
import { ProjectsListItem } from "../../types/OtherTypes";
import { ref, watch } from "vue";

const props = defineProps<{ projectsActive: boolean }>();

let animationList = ref<string[]>([]);
let lockedPreview = ref(false);
let list = ref<ProjectsListItem[]>([
  {
    title: "Employee Management Panel",
    id: 1,
    videoPath: "/rcp_edited_converted.mp4",
    stack: "Vue 3 & Ts & Vite",
    team: "1 FE Dev & 1 BE Dev",
    flow: [
      {
        title: "Administrator",
        text: "Manages the entire application, creates and assigns roles, oversees the operation of the system, and has access to all data and reports",
      },
      {
        title: "Manager/Supervisor/HR employee",
        text: "Responsible for managing work schedules, assigning, accepting and editing employee-submitted work sheets, generating reports",
      },
      {
        title: "User",
        text: "Able to edit and send his work schedules for approval by his supervisors. Is also able to view the history of his work cards",
      },
    ],
    description: `The panel aims to facilitate more than 500 employees by providing an ability to record work time, create schedules, manage time cards and so on.`,
    active: false,
    year: "2024",
  },
  {
    title: "SOK",
    id: 2,
    videoPath: "/sok_edited_converted.mp4",
    stack: "Vue 2",
    team: "1 FE Dev & 1 BE Dev",
    flow: [
      {
        title: "Administrator",
        text: "Manages inspirations sent by users",
      },
      {
        title: "User",
        text: "Able to crate new and manage previous inspiration as well as able to interact with other posts",
      },
    ],
    description: `The app allows all stylists to share nail art they've done, in an Instagram-like panel that collects information on likes and views. It is a place to improve the quality of the services performed and also to inspire each other.`,
    active: false,
    year: "2023",
  },
  {
    title: "RPG Pizza Legends",
    id: 3,
    videoPath: "/pizza_converted.mp4",
    stack: "Pure JS",
    team: "Me",
    description:
      "A 2D RPG game in which you play the role of a chef who owns his pizzas which are used for Pokemon-style dueling. The game allows you to interact with NPCs, upgrade your pizzas and use various useful items.",
    active: false,
    year: "2022",
  },
  {
    title: "Cosmo LP App",
    id: 4,
    videoPath: "/lp-app.mp4",
    stack: "1 Front End Dev",
    team: "Me",
    description:
      "The application is designed for use by a trained non-technical employee who is able to create a full simple landing page from the prepared elements.",
    active: false,
    year: "2021-2022",
  },
]);

watch(
  () => props.projectsActive,
  (newVal) => {
    if (!newVal && lockedPreview.value) {
      animationList.value.push("animation-leave");
      lockedPreview.value = false;
    }
  }
);

watch(
  list,
  (newValue) => {
    let find = newValue.find((el) => el.active === true);
    if (find) {
      animationList.value.push("animation-entry");
    } else {
      animationList.value.push("animation-leave");
    }
  },
  { deep: true }
);
</script>
