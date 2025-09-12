<template>
  <motion.div
    ref="footerRef"
    class="footer"
    :class="{ hide: shouldHideFooter }"
  >
    <div class="footer__contact">
      <div class="contact__info">
        <p>Please feel free to reach out!</p>
        <p class="select">dorau.patryk1@gmail.com</p>
        <p class="select">+48 730798773</p>
      </div>
    </div>

    <div class="footer__social">
      <div
        v-for="(link, index) in links"
        :key="index"
        class="link__container"
        @mousemove="magnetEffect($event, 'img')"
        @mouseleave="resetEffect($event, 'img')"
      >
        <a :href="link.href" target="_blank">
          <motion.img width="30" height="30" :src="link.src" :alt="link.alt" />
        </a>
      </div>
      <div
        class="button__container"
        @mousemove="magnetEffect($event, '.resume')"
        @mouseleave="resetEffect($event, '.resume')"
      >
        <a
          href="https://drive.google.com/file/d/1kFrfXXxEnDKbBL4c-B7CUyRxSv9qSZpD/view?usp=drive_link?usp=sharing"
          target="_blank"
          class="resume"
          >Resume</a
        >
      </div>
    </div>
    <div class="copyrights">
      <p>@2021 Patryk Dorau</p>
      <p>Copyleft! Free to inspire, copy, adapt</p>
      <p>Last updated on 29.06.2025 21:37 UTC</p>
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { useMagnetEffect } from "../../composables/useMagnetEffect";
import { useScroll, motion } from "motion-v";
import { ref, onMounted, onUnmounted, computed } from "vue";

const { scrollYProgress } = useScroll();
const { magnetEffect, resetEffect } = useMagnetEffect();

const currentScrollProgress = ref(0);

let unsubscribeScroll: (() => void) | null;

onMounted(() => {
  unsubscribeScroll = scrollYProgress.on("change", (latestValue) => {
    currentScrollProgress.value = latestValue;
  });
});

onUnmounted(() => {
  if (unsubscribeScroll) {
    unsubscribeScroll();
  }
});

const shouldHideFooter = computed(() => {
  return currentScrollProgress.value < 0.9;
});

const links = ref([
  {
    href: "https://www.linkedin.com/in/patryk-dorau/",
    src: "https://img.icons8.com/ios-filled/30/FFFFFF/linkedin.png",
    alt: "linkedin",
  },
  {
    href: "https://github.com/patrykdorau",
    src: "https://img.icons8.com/ios-filled/30/FFFFFF/github.png",
    alt: "github",
  },
  // Add more links as needed
]);
</script>
