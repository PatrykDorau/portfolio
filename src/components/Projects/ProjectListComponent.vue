<template>
  <div class="project__section">
    <svg viewBox="0 0 1440 320">
      <path
        id="wave"
        fill="#131414"
        fill-opacity="1"
        d="M0,64L120,101.3C240,139,480,213,720,208C960,203,1200,117,1320,74.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
      ></path>
    </svg>
    <div class="projects_list-container" ref="projectListRef" data-nav-id="2">
      <div class="projects__title main__title">FEATURED</div>

      <div class="list">
        <div class="list-scroll_wrapper">
          <ProjectListItemComponent
            v-for="item in pStore.projectsList"
            :key="item.id"
            :id="`project-${item.id}`"
            :data="item"
            v-model:active="item.active"
            class="project-list-item"
          />
        </div>
      </div>
    </div>
    <svg style="rotate: 180deg; margin-top: -1px" viewBox="0 0 1440 320">
      <!-- background-color: #0d0e0e !important; -->
      <path
        id="wave-1"
        fill="#131414"
        fill-opacity="1"
        d="M0,192L120,170.7C240,149,480,107,720,112C960,117,1200,203,1320,245.3L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import ProjectListItemComponent from "./ProjectListItemComponent.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useProjectsStore } from "../../stores/caseStudyStore";

const pStore = useProjectsStore();

let isMobile = ref(window.innerWidth < 1020);

const handleResize = () => {
  isMobile.value = window.innerWidth < 1020;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.project__section {
  display: flex;
  flex-direction: column;
  /* background-color: #0d0e0e !important; */
  overflow: hidden;
  z-index: 6;

  svg {
    &:first-child {
      transform: translateY(1px);
      scale: 1.01;
    }
    &:nth-child(2) {
      transform: translateY(-1px);
      scale: 1.01;
    }
  }
}
/* Position items within the slider */
/* .project-list-item:nth-child(1) {
  transition-delay: 2s;
}
.project-list-item:nth-child(2) {
  transition-delay: 4s;
}
.project-list-item:nth-child(3) {
  transition-delay: 6s;
} */

/* --- Slide Transition Styles (for right-to-left effect by default) --- */

/* Common styles for both entering and leaving elements */

/* slide-left classes: New content enters from right, old content exits to left */
/* Common styles for both entering and leaving elements */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1); /* Smooth easing */
  width: calc(100% / 3); /* Maintain width during transition */
}

/* slide-left classes: New content enters from right, old content exits to left */
.slide-left-enter-from {
  transform: translateX(100%); /* Start off-screen right */
}
.slide-left-leave-to {
  transform: translateX(-100%); /* Move off-screen left */
}

/* slide-right classes: New content enters from left, old content exits to right */
.slide-right-enter-from {
  transform: translateX(-100%); /* Start off-screen left */
}
.slide-right-leave-to {
  transform: translateX(100%); /* Move off-screen right */
}

/* Ensure the entering element is on top during the transition */
.slide-left-enter-active,
.slide-right-enter-active {
  z-index: 2; /* Make the entering element appear above the leaving one */
}

/* Ensure the leaving element is below */
.slide-left-leave-active,
.slide-right-leave-active {
  z-index: 1;
}
</style>
