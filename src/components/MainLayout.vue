<template>
  <div class="main">
    <NavComponent :navigation-data="navigationItems" />
    <SocialBar />
    <div class="site__content">
      <MainPageComponent data-observer data-nav-id="1" />
      <ProjectListComponent
        data-observer
        data-nav-id="2"
        :projects-active="projectsActive"
      />
      <ContactComponent data-observer data-nav-id="3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainPageComponent from "./MainPage/MainPageComponent.vue";
import ProjectListComponent from "./Projects/ProjectListComponent.vue";
import ContactComponent from "./Contact/ContactComponent.vue";
import NavComponent from "./Navbar/NavComponent.vue";
import SocialBar from "./SocialBar/SocialBarComponent.vue";
import { computed, onMounted, ref } from "vue";

defineProps<{ msg: string }>();

let projectsActive = computed(() => {
  return navigationItems.value.some(
    (el) => el.active === true && el.title === "Projects"
  );
});

let navigationItems = ref([
  {
    title: "Home",
    id: 1,
    scrollId: "1",
    active: true,
  },
  {
    title: "Projects",
    scrollId: "2",
    id: 2,
    active: false,
  },
  {
    title: "Contact",
    scrollId: "3",
    id: 3,
    active: false,
  },
]);

onMounted(() => {
  const targetElements = document.querySelectorAll("[data-observer]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = (entry.target as HTMLElement).dataset?.navId;
          let el = navigationItems.value.find(
            (el) => el.id == Number(targetId)
          );
          if (el) {
            navigationItems.value.forEach((el) => {
              el.active = false;
            });
            el.active = true;
          }
        }
      });
    },
    {
      threshold: 1,
    }
  );

  targetElements.forEach((targetElement) => {
    observer.observe(targetElement);
  });
});
</script>
