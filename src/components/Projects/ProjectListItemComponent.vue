<template>
  <div
    class="list_item"
    :class="[
      { 'is-visible': isVisible }, // Use 'is-visible' for consistency and clarity
    ]"
    :data-indicator="props.data.id"
    ref="projectItemRef"
  >
    <div class="item__model">
      <ModelWindowComponent
        v-model:video-controls="videoControls"
        :custom-class="`tablet_container--${props.data.id}`"
        :canvas-class="`tablet-${props.data.id}`"
        container-class="tablet-container"
        animation="tablet"
        modelPath="tablet1.glb"
        :controls="true"
        :cameraPosition="{ x: 0, y: 3.7, z: 0 }"
        :modelPosition="{ x: 0, y: 1, z: 0 }"
        :videoSrc="props.data.videoPath"
      />

      <div class="model_overlay">
        <div class="controls">
          <motion.div
            class="control control--backwards"
            :whilePress="{ scale: 2 }"
            :transition="{ duration: 0.1 }"
            @click="
              () => {
                setVideoFrames('backwards');
                toggleClass('control--backwards', 'scaling');
              }
            "
          >
            <img
              src="/controls/icons8-double-left-24.png"
              alt="Move project video 15 seconds backwards"
            />
          </motion.div>
          <motion.div
            class="control control--status"
            :whilePress="{ scale: 2 }"
            :transition="{ duration: 0.1 }"
            @click="
              () => {
                setVideoFrames('status');
                toggleClass('control--status', 'scaling');
              }
            "
          >
            <img
              v-if="videoControls.status === 'pause'"
              src="/controls/icons8-play-32.png"
              alt="Start project video icon"
            />
            <img
              v-else
              src="/controls/icons8-pause-32.png"
              alt="Pause project video icon"
            />
          </motion.div>
          <motion.div
            class="control control--forwards"
            :whilePress="{ scale: 2 }"
            :transition="{ duration: 0.1 }"
            @click="
              () => {
                setVideoFrames('forwards');
                toggleClass('control--forwards', 'scaling');
              }
            "
          >
            <img
              class="rotate180"
              src="/controls/icons8-double-left-24.png"
              alt="Move project video 15 seconds forwards"
            />
          </motion.div>
        </div>
      </div>
    </div>

    <div class="item_content">
      <div class="tags">
        <div class="tag" v-for="tag in props.data.categories">
          {{ tag }}
        </div>
      </div>
      <div class="item_title" :data-indicator="props.data.id">
        <p class="content">{{ props.data.title }}</p>
        <p>{{ props.data.year }}</p>
      </div>
      <button
        v-if="props.data.caseStudy"
        @click="routerTo(`/study/${props.data.id}`)"
        type="button"
        class="case-study"
      >
        Case study
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Project } from "../../types/ProjectTypes";
import ModelWindowComponent from "../../components/ModelWindowComponent.vue";
import { useToggleClass } from "../../composables/useToggleClass";
import { useProjectsStore } from "../../stores/caseStudyStore";
import { useRouter } from "vue-router";
import { motion } from "motion-v";

const pStore = useProjectsStore();

const router = useRouter();

const props = defineProps<{ data: Project }>();

const { toggleClass } = useToggleClass();

const videoControls = ref({
  playbackRate: 0.85,
  forwards: false,
  backwards: false,
  status: "play",
});

const setVideoFrames = (type: "forwards" | "backwards" | "status") => {
  if (type === "status") {
    if (videoControls.value.status === "play") {
      videoControls.value.status = "pause";
    } else {
      videoControls.value.status = "play";
    }
  }
  if (type === "forwards") {
    videoControls.value.forwards = true;
  }
  if (type === "backwards") {
    videoControls.value.backwards = true;
  }
};

const routerTo = async (to: string) => {
  pStore.currentCaseStudy = props.data.id;

  console.log(to);

  router.push({ path: to });
};

const isVisible = ref(false);

const projectItemRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

// Declare tabletContainer outside moveTabletWithCursor to avoid re-querying on every mouse move
let tabletContainer: HTMLDivElement | null = null;

onMounted(() => {
  if (projectItemRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(projectItemRef.value);
  }
  // Initialize tabletContainer here once
  tabletContainer = document.querySelector(
    ".tablet-container"
  ) as HTMLDivElement;
  if (!tabletContainer) {
    console.warn("'.tablet-container' element not found on mount!");
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
