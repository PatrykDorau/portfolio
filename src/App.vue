<template>
  <router-view v-slot="{ Component }">
    <transition :name="isFirstLoad ? 'fade' : 'slide-fade'">
      <component :is="Component" />
    </transition>
  </router-view>

  <AnimatePresence>
    <motion.div
      v-if="showAnim"
      class="page__name"
      :initial="name.initial"
      :animate="name.animate"
      :exit="name.exit"
      >{{ routeName }}</motion.div
    >
  </AnimatePresence>

  <AnimatePresence>
    <motion.svg
      v-if="showAnim"
      key="animated-svg"
      :initial="slide.initial"
      :animate="slide.animate"
      :exit="slide.exit"
      class="page-transition__curve"
    >
      <motion.path
        key="animated-path"
        :initial="curve.initial"
        :animate="curve.animate"
        :exit="curve.exit"
      ></motion.path>
    </motion.svg>
  </AnimatePresence>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { motion, AnimatePresence } from "motion-v";
import { useProjectsStore } from "./stores/caseStudyStore";

const router = useRouter();
const pStore = useProjectsStore();

const showAnim = ref(false);
const isFirstLoad = ref(true);
const routeName = ref("");

let dimensions = ref({
  width: window.innerWidth,
  height: window.innerHeight,
});

const resize = () => {
  dimensions.value.width = window.innerWidth;
  dimensions.value.height = window.innerHeight;
};

onMounted(() => {
  window.addEventListener("resize", resize);
  setTimeout(() => {
    isFirstLoad.value = false;
  }, 300);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
});

const initialPath = computed(() => {
  const { width, height } = dimensions.value;
  return `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 300
  `;
});

const targetPath = computed(() => {
  const { width, height } = dimensions.value;
  return `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 300
  `;
});

const exitPathFlatTop = computed(() => {
  const { width, height } = dimensions.value;
  return `
    M0 300
    Q${width / 2} 300 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 300
  `;
});

const curve = computed(() => {
  return {
    initial: {
      d: initialPath.value, // Path starts off-screen (e.g., from below)
    },
    animate: {
      d: exitPathFlatTop.value, // Path animates to its covering position
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
    exit: {
      d: targetPath.value, // Path animates off-screen (e.g., upwards)
      transition: {
        duration: 0.3,
        delay: 0.3,
      },
    },
  };
});

const slide = computed(() => {
  return {
    initial: {
      top: "calc(100dvh + 300px)", // SVG container starts off-screen below
    },
    animate: {
      top: "-300px", // SVG container animates to cover the screen
      transition: {
        duration: 0.5,
      },
    },
    // The 'exit' state is what the component animates to when AnimatePresence unmounts it.
    exit: {
      top: "calc(-100dvh - 600px)", // SVG container animates off-screen above
      transition: {
        duration: 0.3,
        delay: 0.3,
      },
    },
  };
});

const name = computed(() => {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.1,
        delay: 0.4,
      },
    },
    exit: {
      top: "-50dvh",
      opacity: 0,
      scale: 0.6,
      transition: {
        duration: 0.3,
        delay: 0.3,
      },
    },
  };
});

// 1. Add this constant definition near your MOTION_EXIT_DURATION_MS.
// This calculates the maximum duration for your overlay to animate *in* and cover the screen.
const OVERLAY_ENTER_DURATION_MS = Math.max(
  // Calculate duration + delay for each element's 'animate' phase
  (slide.value.animate.transition.duration || 0) * 1000 +
    (curve.value.animate.transition.duration || 0) * 1000 +
    (curve.value.animate.transition.delay || 0) * 1000,
  (name.value.animate.transition.duration || 0) * 1000 +
    (name.value.animate.transition.delay || 0) * 1000
);

// 2. Adjust your router.beforeEach
router.beforeEach(async (to, from, next) => {
  let code = to.params.code;

  if (code) {
    routeName.value = pStore.currentProject?.title || "Into unknown";
  } else if (to.path === "/") {
    routeName.value = "Home";
  }
  // If navigating to the same path, allow it immediately without transition
  if (to.path == from.path) {
    next();
    return;
  }

  // --- START OF ADJUSTED LOGIC ---

  // Phase 1: Trigger Custom Overlay Entry Animation
  // Set showAnim to true to make the overlay (SVG curve and page name) appear
  showAnim.value = true;

  // Await the completion of the overlay's ENTER animation.
  // This ensures the screen is fully covered before the router proceeds.
  await new Promise((resolve) =>
    setTimeout(resolve, OVERLAY_ENTER_DURATION_MS - 100)
  ); // +50ms buffer for safety

  window.scrollTo({
    top: 0, // Scroll to top immediately for the new page
  });
  // Phase 2: Allow Vue Router to change the page component
  // At this point, the old page is fully covered by your custom animation.
  // Calling next() allows Vue Router to swap the components within <router-view>.
  // Vue's own 'slide-fade' transition will occur behind your overlay if configured.
  next();

  // Phase 3: Trigger Custom Overlay Exit Animation (after the new page is ready)
  // We need to wait for the new component to be fully rendered and mounted
  // before starting the overlay's exit animation to prevent a flash of unstyled content.
  await nextTick(); // Vue's nextTick ensures DOM updates are flushed.

  // Add a very small buffer to ensure the browser has fully rendered the new component
  // and is ready for the overlay to animate out.
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Now, trigger the exit animation for your custom overlay.
  showAnim.value = false; // This tells AnimatePresence to run the exit animations.

  // The router's navigation is now complete. The overlay's exit animation will play out.
  return Promise.resolve(); // Resolve the promise for beforeEach
  // --- END OF ADJUSTED LOGIC ---
});
</script>

<style lang="scss" scoped>
.page-transition__curve {
  width: 100dvw;
  height: calc(100vh + 600px);
  top: -300px;
  left: 0;
  position: fixed;
  pointer-events: none;
  z-index: 10000;

  path {
    fill: #040608;
  }
}

.page__name {
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  z-index: 10001;
  color: white;
  font-size: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;

  &::before {
    content: "";
    display: block;
    background-color: #af731f;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 15px;
  }
}

/* New transition name for clarity */
.slide-fade-enter-active {
  /* This transition fires AFTER the router.beforeEach timeout */
  transition:
    opacity 0.5s ease,
    transform 0.6s 0.1s ease;
}
.slide-fade-leave-active {
  /* No delay needed here, let the old component fade out immediately */
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(40dvh);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-40dvh);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s 0.2s ease; /* Controls the speed of the fade */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0; /* Starts/ends completely transparent */
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1; /* Starts/ends completely opaque */
}
</style>
