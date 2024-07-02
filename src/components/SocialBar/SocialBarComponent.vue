<template>
  <div class="social__bar desktop">
    <div class="social">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const links = ref([
  {
    href: "https://www.linkedin.com/in/patryk-dorau-018467216/",
    src: "https://img.icons8.com/ios-filled/30/FFFFFF/linkedin.png",
    alt: "linkedin",
  },
  {
    href: "https://www.facebook.com/patryk.dorau.5",
    src: "https://img.icons8.com/ios-filled/30/FFFFFF/facebook--v1.png",
    alt: "facebook",
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

    image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
};

const resetEffect = (index: number) => {
  const image = magnetImages.value[index];

  if (image) {
    image.style.transform = "translate(0, 0)";
  }
};

onMounted(() => {
  magnetLinks.value = new Array(links.value.length).fill(null);
  magnetImages.value = new Array(links.value.length).fill(null);
});
</script>
