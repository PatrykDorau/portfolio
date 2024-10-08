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
        text: "Have full control over the system, managing all aspects of the application. They can create and assign roles, oversee operations, and access detailed reports and data to ensure smooth management of the workforce.",
      },
      {
        title: "Manager/Supervisor/HR employee",
        text: "Can efficiently manage work schedules, review and approve employee-submitted time cards, and generate comprehensive reports for performance tracking.",
      },
      {
        title: "User",
        text: "Can submit, edit, and send their work schedules for approval, as well as review their time card history. This empowers employees to take ownership of their work records while ensuring transparency and accountability.",
      },
    ],
    description: `EMP is a comprehensive workforce management solution that streamlines time tracking, scheduling, and time card management for organizations of any size. With a role-based system, it offers tailored functionalities for administrators, managers, and employees, ensuring efficient and accurate management of employee work records.`,
    active: false,
    year: "2024",
  },
  {
    title: "Local News",
    id: 2,
    videoPath: "/cosmo_news_converted.mp4",
    stack: "Vue 3 & Ts & Vite",
    team: "1 FE Dev & 1 BE Dev",
    flow: [
      {
        title: "Administrator",
        text: "Have full control to create, edit, and manage categories, posts and pages, ensuring relevant information reaches the right people",
      },
    ],
    description: `Local News App is an all-in-one internal news platform designed to keep everyone in your company informed and engaged. It offers a dynamic, organized system for sharing company updates, announcements, and internal content through customizable categories and posts.`,
    active: false,
    year: "2024",
  },
  {
    title: "Cosmo Returns",
    id: 3,
    videoPath: "/returns_converted.mp4",
    stack: "Vue 3 & Ts & Vite",
    team: "1 FE Dev & 1 BE Dev",
    description: `Cosmo Returns is a user-friendly platform designed to streamline the process of managing returns and complaints for customers. With an intuitive interface, it allows users to easily create, track, and review return requests and complaints, ensuring a smooth resolution process.`,
    active: false,
    year: "2024",
  },
  {
    title: "SOK",
    id: 4,
    videoPath: "/sok_edited_converted.mp4",
    stack: "Vue 2",
    team: "1 FE Dev & 1 BE Dev",
    flow: [
      {
        title: "Administrator",
        text: "Manage user submissions and ensure that the platform remains a positive and inspiring environment for all users",
      },
      {
        title: "User",
        text: "Can create new inspiration posts, edit their previous submissions, and interact with other stylists' posts through likes and comments, fostering a collaborative community atmosphere.",
      },
    ],
    description: `SOK is a dynamic internal community platform for NEONAIL stylists to showcase their artistry and connect with peers. With an Instagram-like interface, the app enables stylists to share nail art creations and track engagement through likes and views, fostering inspiration and continuous service improvement.`,
    active: false,
    year: "2023",
  },
  {
    title: "RPG Pizza Legends",
    id: 5,
    videoPath: "/pizza_converted.mp4",
    stack: "JS & HTML",
    team: "Me & my YT tutor :)",
    flow: [
      {
        title: "Learning Experience",
        text: "Developed as part of a learning journey, this project is based on an influential YouTube tutorial, highlighting my commitment to skill development.",
      },
    ],
    description:
      "Pizza Legends is an engaging 2D RPG where players become a talented chef on a unique culinary adventure that blends pizza-making with Pokémon-style dueling. Interact with vibrant NPCs, enhance pizza recipes, and strategize duels with various items. Currently in demo mode, the game awaits a bright future.",
    active: false,
    year: "2022",
  },
  {
    title: "Cosmo LP App",
    id: 6,
    videoPath: "/lp-app.mp4",
    stack: "Vue 2",
    team: "Me",
    description:
      "This user-friendly component library empowers non-technical employees to effortlessly create effective landing pages. With a collection of pre-built components, users can easily customize web pages without extensive technical knowledge. The library generates clean Vue.js code, ready for integration.",
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
