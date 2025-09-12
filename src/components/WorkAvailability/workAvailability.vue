<template>
  <div
    class="work__availability"
    id="work__availability"
    :style="{ bottom: bottom + 'px' }"
  >
    <div class="contact__content">
      <div class="overflow__hider">
        <div class="flex">
          <div class="social">
            <div
              v-for="(link, index) in links"
              :key="index"
              class="link__container"
            >
              <a :href="link.href" target="_blank">
                <img width="30" height="30" :src="link.src" :alt="link.alt" />
              </a>
            </div>
          </div>
          <a
            href="https://drive.google.com/file/d/1kFrfXXxEnDKbBL4c-B7CUyRxSv9qSZpD/view?usp=drive_link?usp=sharing"
            target="_blank"
            class="resume"
            >Show</a
          >
          <!-- <div class="resume"></div> -->
        </div>
      </div>
    </div>

    <div class="availability__visible">
      <div class="progress-bar">
        <svg>
          <circle cx="10" cy="10" r="10"></circle>
          <circle id="progress" cx="10" cy="10" r="10"></circle>
        </svg>
      </div>
      Open to work
      <div class="dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

let props = defineProps<{ managePosition: boolean }>();

let bottom = ref(5);

let wH = 0;
let mH = 0;

const links = [
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
];

const scrollHandler = () => {
  let maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScrollY <= 0) {
    maxScrollY = 1; // Prevents division by zero or negative values
  }

  const scrollEffectStart = 0;
  // Fix: scrollEffectEnd should be the maximum scrollable position
  const scrollEffectEnd = maxScrollY;
  const progressBar = document.querySelector("#progress") as HTMLElement;
  const currentScrollY = window.scrollY;
  let backgroundScrollProgress =
    (currentScrollY - scrollEffectStart) /
    (scrollEffectEnd - scrollEffectStart);

  backgroundScrollProgress = Math.max(0, Math.min(1, backgroundScrollProgress));

  if (progressBar) {
    let newStroke = 65 - backgroundScrollProgress * 62;

    progressBar.style.strokeDashoffset = `${newStroke}`;
  }

  if (
    props.managePosition &&
    backgroundScrollProgress > 0.1 &&
    window.innerWidth > 768
  ) {
    bottom.value = 5;
  } else {
    if (mH >= wH) {
      return;
    } else {
      bottom.value = wH - mH;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
  let main = document.querySelector(".main_page") as HTMLElement;

  if (!main || !props.managePosition || window.innerWidth < 768) return;

  wH = window.innerHeight;
  mH = main.offsetHeight;

  if (mH >= wH) {
    return;
  } else {
    bottom.value = wH - mH;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});
</script>
