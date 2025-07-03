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
import { ref, computed, onMounted, onUnmounted } from "vue";
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

const MOTION_EXIT_DURATION_MS = Math.max(
  slide.value.exit.transition.duration + slide.value.exit.transition.delay,
  curve.value.exit.transition.duration + curve.value.exit.transition.delay
);

router.beforeEach(async (to, from, next) => {
  let code = to.params.code;
  // pStore.currentCaseStudy = Number(code);

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

  // Wrap the async logic in a Promise
  return new Promise(async (resolve) => {
    showAnim.value = true;
    await new Promise((res) => setTimeout(res, 600));

    showAnim.value = false;

    window.scrollTo({
      top: 0,
    });
    setTimeout(() => {
      next();
      resolve();
    }, MOTION_EXIT_DURATION_MS + 50);
  });
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
  z-index: 100;

  path {
    fill: #040608;
  }
}

.page__name {
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  z-index: 101;
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
    transform 0.5s ease;
}
.slide-fade-leave-active {
  /* No delay needed here, let the old component fade out immediately */
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(40dvh); /* Starts 20px below its final position */
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0); /* Ends at its normal position */
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-100px); /* Moves up and fades out */
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
