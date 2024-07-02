<template>
  <div class="main_page">
    <div class="section__title">
      <span class="number">01</span>
      <WavyTextComponent
        custom-class="content"
        text="About"
        bg-size="100px"
        bgPos="68%"
      />
    </div>
    <div class="page__content">
      <div class="left_col" :class="[{ active: loaded }]">
        <div class="text_container">
          <p class="home_text_p1" :class="[{ glitch: fastForwarding }]">
            <GlitchEffect
              :preGlitch="String(currentYear)"
              :glitch="String(currentYear)"
              :play="fastForwarding"
            />
          </p>
          <div class="home_text_p2">
            <GlitchEffect
              :preGlitch="entryData"
              :glitch="entryData"
              customClass="home_description"
              :play="copyChange"
            />
          </div>
          <div class="buttons">
            <div class="rewind" @click="manageYear(0)">
              <span class="content">Backward</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                stroke-width="0"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.94601 5.59492C3.92853 4.15983 1 5.48359 1 7.83062V16.1694C1 18.5164 3.92853 19.8402 5.94601 18.4051L11 14.81V16.1694C11 18.5164 13.9285 19.8402 15.946 18.4051L21.8074 14.2357C23.3975 13.1046 23.3975 10.8954 21.8074 9.76429L15.946 5.59492C13.9285 4.15983 11 5.48359 11 7.83062V9.18996L5.94601 5.59492ZM3.0462 7.83062C3.0462 7.04828 4.02237 6.60703 4.69487 7.08539L10.5563 11.2548C11.0863 11.6318 11.0863 12.3682 10.5563 12.7452L4.69487 16.9146C4.02237 17.393 3.0462 16.9517 3.0462 16.1694V7.83062ZM13.0462 7.83062C13.0462 7.04828 14.0224 6.60703 14.6949 7.08539L20.5563 11.2548C21.0863 11.6318 21.0863 12.3682 20.5563 12.7452L14.6949 16.9146C14.0224 17.393 13.0462 16.9517 13.0462 16.1694V7.83062Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="roll" @click="manageYear(1)">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                stroke-width="0"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.94601 5.59492C3.92853 4.15983 1 5.48359 1 7.83062V16.1694C1 18.5164 3.92853 19.8402 5.94601 18.4051L11 14.81V16.1694C11 18.5164 13.9285 19.8402 15.946 18.4051L21.8074 14.2357C23.3975 13.1046 23.3975 10.8954 21.8074 9.76429L15.946 5.59492C13.9285 4.15983 11 5.48359 11 7.83062V9.18996L5.94601 5.59492ZM3.0462 7.83062C3.0462 7.04828 4.02237 6.60703 4.69487 7.08539L10.5563 11.2548C11.0863 11.6318 11.0863 12.3682 10.5563 12.7452L4.69487 16.9146C4.02237 17.393 3.0462 16.9517 3.0462 16.1694V7.83062ZM13.0462 7.83062C13.0462 7.04828 14.0224 6.60703 14.6949 7.08539L20.5563 11.2548C21.0863 11.6318 21.0863 12.3682 20.5563 12.7452L14.6949 16.9146C14.0224 17.393 13.0462 16.9517 13.0462 16.1694V7.83062Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
              <span class="content">Forward</span>
            </div>
          </div>
        </div>
      </div>
      <ModelWindowComponent
        :class="[{ active: loaded }]"
        :resize-max="600"
        canvas-class="fast_forward"
        container-class="fast_forward-model"
        modelPath="ff3.glb"
        animation="ff"
        :cameraPosition="{ x: 0, y: 0, z: 3 }"
        :modelPosition="{ x: -0, y: 0, z: -2 }"
      />
    </div>
    <div class="bar__info">
      <div class="box">
        <div class="title">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/briefcase.png"
            alt="briefcase"
          />
          <WavyTextComponent text="Recent experience" />
        </div>
        <p class="content">Mid front end developer @ Cosmogroup</p>
      </div>
      <div class="box">
        <div class="title">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/glyph-neue/64/FFFFFF/marker--v1.png"
            alt="marker--v1"
          />
          <WavyTextComponent text="Location" />
        </div>
        <p class="content">Poznań Poland</p>
      </div>
      <div class="box">
        <div class="title">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/settings.png"
            alt="settings"
          />
          <WavyTextComponent text="Tech stack" />
        </div>
        <p class="content">Vue TS SASS HTML GIT Threejs Blender</p>
      </div>
      <div class="box">
        <div class="title">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/graduation-cap--v1.png"
            alt="graduation-cap--v1"
          />
          <WavyTextComponent text="Degree" />
        </div>
        <p class="content">Bachelor's @ Math data analysis</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModelWindowComponent from "../ModelWindowComponent.vue";
import WavyTextComponent from "../WavyText/WavyTextComponent.vue";
import GlitchEffect from "../GlitchEffect/GlitchEffectComponent.vue";
import { onMounted, ref } from "vue";

const date = new Date();

let fastForwarding = ref(false);
let copyChange = ref(false);

let timeTravelStarted = ref(false);
let loaded = ref(false);

let currentYear = ref<string | number>("20xx");
let entryData = ref(
  "My name is Patryk, I'm a Frontend Developer. Discover my story with time travel"
);

const copyData = ref([
  {
    yearStart: 1999,
    yearEnd: 1999,
    intervalDec: 1000,
    intervalInc: 500,
    copy: "Nothing here, too soon for me.",
    active: false,
  },
  {
    yearStart: 2000,
    yearEnd: 2000,
    intervalDec: 500,
    intervalInc: 100,
    copy: "Born in Czarna Woda, moved to Poznań later.",
    active: false,
  },
  {
    yearStart: 2020,
    yearEnd: 2021,
    intervalDec: 500,
    intervalInc: 500,
    copy: "First github entry, and first commercial job as Full Stack Developer.",
    active: false,
  },
  {
    yearStart: 2021,
    yearEnd: 2022,
    intervalDec: 500,
    intervalInc: 500,
    copy: "Re-branding to Front End Developer and rapid promotion to the mid level.",
    active: false,
  },
  {
    yearStart: 2022,
    yearEnd: date.getFullYear(),
    intervalDec: 500,
    intervalInc: 500,
    copy: "Contact to check my status. I am very possibly looking for someone to write the next chapter of my story.",
    active: false,
    start: true,
  },
  {
    yearStart: date.getFullYear(),
    yearEnd: date.getFullYear() + 3,
    intervalDec: 500,
    intervalInc: 50,
    copy: "Prosperous senior Front End Developer.",
    active: false,
  },
  {
    yearStart: date.getFullYear(),
    yearEnd: 2100,
    intervalDec: 50,
    intervalInc: 50,
    copy: "Bitcoin reach 1.000.000$. The wall is almost finished. EU is one country. Oil is running out. Life exists on Mars.",
    active: false,
  },
]);

onMounted(() => {
  loaded.value = true;
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const incrementYear = async () => {
  if (fastForwarding.value) return;
  fastForwarding.value = true;

  let currentIndex = copyData.value.findIndex((el) => el.active == true);
  let dirElement =
    copyData.value[
      currentIndex < copyData.value.length - 1 ? currentIndex + 1 : currentIndex
    ];

  copyData.value[currentIndex].active = false;
  dirElement.active = true;

  // Ensure we have a valid currentIndex

  while (
    typeof currentYear.value === "number" &&
    currentYear.value <= dirElement.yearEnd
  ) {
    await delay(copyData.value[currentIndex].intervalInc);
    copyChange.value = true;
    currentYear.value++;
  }
  entryData.value = dirElement.copy;
  fastForwarding.value = false;
  copyChange.value = false;
};

const decrementYear = async () => {
  if (fastForwarding.value) return;
  fastForwarding.value = true;
  copyChange.value = true;

  let currentIndex = copyData.value.findIndex((el) => el.active === true);
  let dirElement =
    copyData.value[currentIndex > 1 ? currentIndex - 1 : currentIndex];

  copyData.value[currentIndex].active = false;
  dirElement.active = true;

  // Ensure we have a valid currentIndex

  while (
    typeof currentYear.value === "number" &&
    currentYear.value > dirElement.yearEnd
  ) {
    await delay(copyData.value[currentIndex].intervalDec);
    currentYear.value--;
  }

  entryData.value = dirElement.copy;
  fastForwarding.value = false;
  console.log(fastForwarding.value);
  copyChange.value = false;
};

const manageYear = async (direction: 0 | 1) => {
  if (!timeTravelStarted.value) {
    timeTravelStarted.value = true;
    fastForwarding.value = true;
    copyChange.value = true;
    await delay(1000);
    let start = copyData.value.find((el) => el.start == true);
    if (!start) return;
    start.active = true;
    currentYear.value = start.yearEnd;
    entryData.value = start.copy;

    copyChange.value = false;
    fastForwarding.value = false;
  } else if (direction == 0) {
    decrementYear();
  } else if (direction == 1) {
    incrementYear();
  }
};
</script>
