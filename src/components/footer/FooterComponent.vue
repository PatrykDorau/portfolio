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
        @mousemove="(event) => magnetEffect(event, index)"
        @mouseleave="resetEffect(index)"
      >
        <a
          :href="link.href"
          target="_blank"
          :ref="(el) => (magnetLinks[index] = el as HTMLElement)"
        >
          <img
            width="30"
            height="30"
            :src="link.src"
            :alt="link.alt"
            :ref="(el) => (magnetImages[index] = el as HTMLImageElement)"
          />
        </a>
      </div>
      <a
        href="https://drive.google.com/file/d/17cOTRdCwn3LABR1cztGms3i8QbvISL3g/view?usp=sharing"
        target="_blank"
        class="resume"
        >Resume</a
      >
    </div>
    <div class="copyrights">
      <p>@2021 Patryk Dorau</p>
      <p>All rights reserved</p>
      <p>Last updated on 29.06.2025 21:37 UTC</p>
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { useScroll, motion } from "motion-v";
import { ref, onMounted, onUnmounted, computed } from "vue";

const { scrollYProgress } = useScroll();

const currentScrollProgress = ref(0);

let unsubscribeScroll: (() => void) | null;

onMounted(() => {
  // The onChange callback gives you the latest numerical value
  unsubscribeScroll = scrollYProgress.onChange((latestValue) => {
    currentScrollProgress.value = latestValue;
    // You can console.log here to verify the value is updating:
    // console.log('currentScrollProgress:', currentScrollProgress.value);
  });
});

onUnmounted(() => {
  // Crucially, unsubscribe when the component is unmounted to prevent memory leaks
  if (unsubscribeScroll) {
    unsubscribeScroll();
  }
});

// Optional: Use a computed property for clearer logic or further derivation
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

const magnetLinks = ref<(HTMLElement | null)[]>([]);
const magnetImages = ref<(HTMLImageElement | null)[]>([]);

const magnetEffect = (event: MouseEvent, index: number) => {
  const link = magnetLinks.value[index];
  const image = magnetImages.value[index];

  if (link && image) {
    const linkRect = link.getBoundingClientRect();
    const linkCenterX = linkRect.left + linkRect.width / 2;
    const linkCenterY = linkRect.top + linkRect.height / 2;

    const offsetX = Math.min(
      Math.max(((event.clientX - linkCenterX) / linkRect.width) * 30, -10),
      10
    );
    const offsetY = Math.min(
      Math.max(((event.clientY - linkCenterY) / linkRect.height) * 30, -10),
      10
    );
    image.style.transition = "none";
    image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
};

const resetEffect = (index: number) => {
  const image = magnetImages.value[index];

  if (image) {
    image.style = "transition: all 0.2s ease; transform: translate(0, 0)";
  }
};

onMounted(() => {
  magnetLinks.value = new Array(links.value.length).fill(null);
  magnetImages.value = new Array(links.value.length).fill(null);
});
</script>
