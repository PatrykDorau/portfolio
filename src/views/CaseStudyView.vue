<template>
  <div class="case-study__view">
    <router-link to="/" class="back__button"
      ><img
        src="/src/assets/images/controls/icons8-arrow-24.png"
        alt=""
        srcset=""
    /></router-link>
    <div
      class="no-data__info"
      v-if="!store.currentProject || !store.currentProject?.caseStudy"
    >
      This case study doesn't exist! Probably still in prep or the project is
      nowhere to be found!
    </div>
    <div v-else class="case-study__project">
      <section class="case-study__banner">
        <h1 class="project__title">{{ store.currentProject.title }}</h1>
        <section class="case-study__summary case-study__section">
          <div class="summary__description">
            {{ store.currentProject.benefit }}
          </div>
          <div class="grid">
            <div class="grid__element section__client">
              <p class="element__title">Client</p>
              <p class="element__content">{{ store.currentProject.client }}</p>
            </div>
            <div class="grid__element section__country">
              <p class="element__title">Country</p>
              <p class="element__content">{{ store.currentProject.country }}</p>
            </div>
            <div class="grid__element section__technology">
              <p class="element__title">Stack</p>
              <div class="element__content">
                <p
                  class="content__stack"
                  v-for="(st, index) in store.currentProject.stack"
                  :key="index"
                >
                  {{ st }}
                </p>
              </div>
            </div>
            <div class="grid__element section__industry">
              <p class="element__title">Industry</p>
              <p class="element__content">
                {{ store.currentProject.industry }}
              </p>
            </div>
            <div class="grid__element section__team">
              <p class="element__title">Team</p>
              <p class="element__content">{{ store.currentProject.team }}</p>
            </div>
            <div class="grid__element section__duration">
              <p class="element__title">Duration</p>
              <p class="element__content">
                {{ store.currentProject.duration }}
              </p>
            </div>
          </div>
        </section>
        <motion.div
          :initial="{ opacity: 0, transform: 'translateY(10dvh)' }"
          :animate="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ duration: 0.2, delay: 0.2 }"
        >
          <BrowserWindow id="project-banner" v-if="store.currentProject.banner">
            <template #window-content>
              <img
                :src="store.currentProject.banner"
                alt="project banner image"
              />
            </template>
          </BrowserWindow>
        </motion.div>
        <svg data-v-3001c0cf="" viewBox="0 0 1440 320" style="z-index: 2">
          <path
            data-v-3001c0cf=""
            id="project-wave-4"
            fill="rgb(13, 14, 14)"
            fill-opacity="1"
            d="M0,192L120,170.7C240,149,480,107,720,112C960,117,1200,203,1320,245.3L1440,288L1440,320L0,320Z"
          ></path>
        </svg>
      </section>
      <section class="case-study__section case-study__challenge">
        <p class="challenge__title section__title">Challenge</p>
        <div class="challenges__flex">
          <div class="challenges">
            <p class="theoretical__title">Theoretical</p>
            <div class="challenge">
              {{ store.currentProject.challenges?.theoretical }}
            </div>
          </div>
          <div class="challenges">
            <p class="technical__title">Technical</p>
            <div
              class="challenge"
              v-for="ch in store.currentProject.challenges?.technical"
              :key="ch"
            >
              {{ ch }}
            </div>
          </div>
        </div>
      </section>
      <section class="case-study__section case-study__process">
        <p class="process__title section__title">Process</p>
        <div class="process__wrapper">
          <div
            class="process__element"
            v-for="(pr, index) in store.currentProject.process"
            :key="index"
          >
            <div class="element__indicator">{{ index + 1 }}</div>
            <div class="element__keywords">
              <p class="keyword__title">{{ pr.title }}</p>
              <div class="keyword" v-for="kw in pr.keywords">
                {{ kw }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="case-study__section case-study__flow">
        <p class="flow__title section__title">User Flow</p>
        <div class="flow__wrapper">
          <div
            class="flow__element"
            :id="`flow-${index}`"
            v-for="(uf, index) in store.currentProject.userFlow"
            :key="index"
          >
            <BrowserWindow>
              <template #title>{{ uf.title }}</template>
              <template #window-content>
                <img :src="uf.img" alt="user flow image" />
              </template>
            </BrowserWindow>
          </div>
        </div>
      </section>
      <section class="case-study__section case-study__outcome">
        <p class="outcome__title section__title">Outcome</p>

        <div class="outcome__wrapper">
          <div
            class="outcome__element"
            v-for="(ou, index) in store.currentProject.outcome"
            :key="index"
          >
            <p class="element__title">{{ ou.data }}</p>
            <p class="element__description">{{ ou.description }}</p>
          </div>
        </div>
        <div class="outcome__info">
          *These numbers are based on highly sophisticated calculations and my
          distant memories of mathematics class, so they're probably
          <i>ALMOST</i> accurate.
        </div>
        <div class="outcome__desc">
          {{ store.currentProject.outcomeDesc }}
        </div>
      </section>
      <svg
        data-v-3001c0cf=""
        viewBox="0 0 1440 320"
        style="transform: translateY(10px)"
      >
        <path
          data-v-3001c0cf=""
          id="project-wave-5"
          fill-opacity="1"
          fill="#131414"
          d="M0,192L120,170.7C240,149,480,107,720,112C960,117,1200,203,1320,245.3L1440,288L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
    <FooterComponent
      v-if="store.currentProject && store.currentProject?.caseStudy"
      class="bg--secondary"
    />
    <WorkAvailability :manage-position="false" />
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from "../stores/caseStudyStore";
import FooterComponent from "../components/footer/FooterComponent.vue";
import BrowserWindow from "../components/BrowserWindow/BrowserWindow.vue";
import WorkAvailability from "../components/WorkAvailability/workAvailability.vue";
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useCalculateWavePath } from "../composables/useCalculateWavePath";
import { useCalculateScrollProgress } from "../composables/useCalculateScrollProgress";
import { motion } from "motion-v";

const { getElementScrollProgress } = useCalculateScrollProgress();
const { updateWavePath } = useCalculateWavePath();

const route = useRoute();
const store = useProjectsStore();

store.currentCaseStudy = Number(route.params.code);

// const createUrl = (path: string) => {
//   return `/src/${path}`;
// };

let scrollHandler: (() => void) | null = null;
const observers: IntersectionObserver[] = [];

onMounted(() => {
  if (!store.currentProject || !store.currentProject.caseStudy) return;

  const calculateScrollProgressForFlow = (
    currentScrollY: number,
    sectionTop: number,
    sectionHeight: number,
    index: number = 0,
    totalElements: number = 1
  ): number => {
    const viewportHeight = window.innerHeight;

    const overallAnimationStart = sectionTop - viewportHeight * 0.9; // Adjust 0.7 (e.g., 0.8 to start later, 0.6 to start earlier)

    const overallAnimationEnd = sectionTop + sectionHeight - viewportHeight;

    let overallProgress =
      (currentScrollY - overallAnimationStart) /
      (overallAnimationEnd - overallAnimationStart);
    overallProgress = Math.max(0, Math.min(1, overallProgress)); // Clamp progress between 0 and 1

    const segmentDuration = 1 / totalElements;
    const segmentStart = index * segmentDuration;

    let elementProgress = (overallProgress - segmentStart) / segmentDuration;
    elementProgress = Math.max(0, Math.min(1, elementProgress));

    return elementProgress;
  };

  const animateSectionFlow = (
    titleElement: HTMLElement | null,
    sectionElement: HTMLElement | null,
    currentScrollY: number,
    dir: "left" | "right" | "top" = "top",
    index: number = 0,
    totalElements: number = 1
  ) => {
    if (!titleElement || !sectionElement) {
      return;
    }

    const sectionTop = sectionElement.offsetTop;
    const sectionHeight = sectionElement.offsetHeight;

    const scrollProgress = calculateScrollProgressForFlow(
      currentScrollY,
      sectionTop,
      sectionHeight,
      index,
      totalElements
    );

    let newValue = 100 - scrollProgress * 100;

    titleElement.style.opacity = "1"; // Make element visible
    if (dir === "left") {
      // Sliding FROM LEFT: from -100% to 0%
      titleElement.style.transform = `translateX(${-newValue}%)`;
    } else if (dir === "right") {
      // Sliding FROM RIGHT: from +100% to 0%
      titleElement.style.transform = `translateX(${newValue}%)`;
    } else if (dir === "top") {
      // Sliding FROM BOTTOM: from +100% to 0% on Y-axis
      titleElement.style.transform = `translateY(${newValue}%)`;
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const sections = {
    bannerImg: document.querySelector("#project-banner") as HTMLElement,
    bannerContainer: document.querySelector(
      ".case-study__banner"
    ) as HTMLElement,
    summary: document.querySelector(".case-study__summary") as HTMLElement,
    challenge: document.querySelector(".case-study__challenge") as HTMLElement,
    process: document.querySelector(".case-study__process") as HTMLElement,
    flow: document.querySelector(".case-study__flow") as HTMLElement,
    outcome: document.querySelector(".case-study__outcome") as HTMLElement,
  };

  const waves = {
    wave1: document.querySelector("#project-wave-4") as HTMLElement,
    wave2: document.querySelector("#project-wave-5") as HTMLElement,
  };

  const flowImgs = {
    flow1: document.querySelector("#flow-0") as HTMLElement,
    flow2: document.querySelector("#flow-1") as HTMLElement,
    flow3: document.querySelector("#flow-2") as HTMLElement,
  };

  for (const key in sections) {
    if (Object.prototype.hasOwnProperty.call(sections, key)) {
      const section = sections[key as keyof typeof sections]; // Type assertion for safety

      if (section) {
        // Ensure the element was found
        const observer = new IntersectionObserver(handleIntersection, options);
        observer.observe(section);
        observers.push(observer); // Store the observer for cleanup
      } else {
        console.warn(`IntersectionObserver: Section "${key}" not found.`);
      }
    }
  }

  let maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

  if (maxScrollY <= 0) {
    maxScrollY = 1;
  }

  let scrollHandler = () => {
    const currentScrollY = window.scrollY;
    const scrollEffectStart = 0;
    const scrollEffectEnd = maxScrollY;

    let backgroundScrollProgress =
      (currentScrollY - scrollEffectStart) /
      (scrollEffectEnd - scrollEffectStart);

    backgroundScrollProgress = Math.max(
      0,
      Math.min(1, backgroundScrollProgress)
    );

    // const bannerScrollProgress = calculateScrollProgress(
    //   currentScrollY,
    //   sections.bannerContainer,
    // );
    const bannerScrollProgress = getElementScrollProgress(
      currentScrollY,
      sections.bannerContainer
    );

    const flowScrollProgress = getElementScrollProgress(
      currentScrollY,
      sections.flow
    );

    if (sections.bannerImg) {
      let newValue = bannerScrollProgress * 30;
      sections.bannerImg.style.transform = `translateY(${Math.min(5, newValue)}%)`;
    }

    const totalFlowImages = Object.keys(flowImgs).length;

    animateSectionFlow(
      flowImgs.flow1,
      sections.flow,
      currentScrollY,
      "right",
      0,
      totalFlowImages
    );
    // flow2 from left
    animateSectionFlow(
      flowImgs.flow2,
      sections.flow,
      currentScrollY,
      "left",
      1,
      totalFlowImages
    );
    // flow3 from right
    animateSectionFlow(
      flowImgs.flow3,
      sections.flow,
      currentScrollY,
      "right",
      2,
      totalFlowImages
    );

    if (bannerScrollProgress) {
      updateWavePath(bannerScrollProgress, waves.wave1);
    }

    console.log(flowScrollProgress);
    if (flowScrollProgress) {
      updateWavePath(flowScrollProgress, waves.wave2);
    }
  };

  window.addEventListener("scroll", scrollHandler);

  scrollHandler();
});

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
  }
});
</script>

<style lang="scss" scoped>
.case-study__project {
  // background-color: #131414 !important;
  z-index: 2;
  position: relative;
}
.no-data__info {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: #131414;
  z-index: 4;
}
.footer {
  opacity: 1;
  position: relative !important;
}

.tablet-container-study {
  width: clamp(200px, 475px, 100dvw);
  height: clamp(400px, 500px, 100dvw);
  min-height: 400px;

  flex: 1;
  z-index: 2;
  top: 0;
  margin-inline: auto;
}
.tablet-study {
  width: 100%;
  height: 100%;
}

.back__button {
  background-color: #af731f;
  width: fit-content;
  border-radius: 50%;
  padding: 10px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 5;
  rotate: 180deg;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  transition: all 0.2s ease;
  box-shadow: inset 0 0 0 -1px #131414;
  border: 2px solid transparent;

  &:hover {
    box-shadow: inset 0 50px 0 -1px #131414;
    border: 2px solid rgba(255, 255, 255, 0.04);
    scale: 1.1;
  }
}

.section__title {
  position: absolute;
  top: 0;
  left: 2vw;
  right: 0;
  bottom: 0;
  font-size: clamp(50px, 17vw, 200px);
  color: #131414;
  // filter: brightness(0.8);
  pointer-events: none;
  z-index: -1;
  line-height: 0;
}

.case-study__flow {
  .flow__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
    overflow: hidden;

    .flow__element {
      width: 100%;
    }
  }
}

.case-study__section {
  z-index: 3;
  position: relative;
  margin-top: -2px;
  padding-block: 25px;
  padding-bottom: 150px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s 0.2s ease,
    transform 0.5s ease-in-out;

  &:last-child {
    padding-bottom: 20px !important;
  }

  &.is-visible {
    opacity: 1;
    transform: translateY(0px);
  }
}

.case-study__banner {
  background-color: #131414;
  // min-height: 40dvh;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .project__title {
    margin: 0;
    width: fit-content;
    margin-inline: auto;
    font-size: clamp(50px, 5vw, 150px);
  }
}

.case-study__summary {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-bottom: 50px !important;
  padding-bottom: 0 !important;
  transition-delay: 0s !important;
  transition-duration: 0.2s !important;

  .section__technology {
    .element__content {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;

      .content__stack {
        font-family: "Nunito";
        padding: 4px;
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .grid {
    max-width: 1000px;
    width: 100%;
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .grid__element {
      padding: 10px 15px;

      .element__title {
        font-size: 20px;
        margin-bottom: 10px;
      }

      .element__content {
        filter: brightness(0.8);
        letter-spacing: 0.5px;
        font-family: "Nunito";
      }
    }
  }

  .summary__description {
    max-width: 1000px;
    width: 100%;
    margin-inline: auto;
    padding: 10px 15px;
    filter: brightness(0.8);
    letter-spacing: 0.5px;
    font-family: "Nunito";
  }
}

.case-study__challenge {
  padding-top: 50px;
  .challenge__title {
    top: 0;
  }

  .challenges__flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1000px;
    width: 100%;
    margin-inline: auto;
    gap: 20px;
    padding: 10px 15px;
  }

  .challenges {
    flex: 1;
    padding-bottom: 10px;

    @media (max-width: 768px) {
      flex-basis: 100%;
    }

    .theoretical__title,
    .technical__title {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .challenge {
      filter: brightness(0.8);
      letter-spacing: 0.5px;
      font-family: "Nunito";
    }
  }
}

.case-study__process {
  .process__wrapper {
    max-width: 1000px;
    width: 100%;
    margin-inline: auto;
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;

    .process__element {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex: 1;

      .element__indicator {
        width: 100px;
        height: 100px;
        background-color: #131414;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.04);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 19px 12px;
        font-size: 20px;
      }

      .element__keywords {
        display: flex;
        flex-direction: column;
        align-items: center;

        .keyword__title {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .keyword {
          filter: brightness(0.8);
          text-align: center;
          letter-spacing: 0.5px;
          font-family: "Nunito";
        }
      }
    }
  }
}

.case-study__outcome {
  position: relative;
  padding-bottom: 20px;

  .outcome__info {
    max-width: 1000px;
    width: 100%;
    margin-inline: auto;
    padding: 10px 15px;
    margin-top: 30px;
    font-size: 14px;
    filter: brightness(0.5);
    letter-spacing: 0.7px;
  }

  .outcome__desc {
    margin-top: 30px;
    max-width: 1000px;
    width: 100%;
    margin-inline: auto;
    padding: 10px 15px;
    filter: brightness(0.8);
    letter-spacing: 0.5px;
    font-family: "Nunito";
  }

  .outcome__wrapper {
    max-width: 1000px;
    width: 100%;
    margin-inline: auto;
    padding: 10px 15px;
    display: flex;
    gap: 20px;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-wrap: wrap;

      .outcome__element {
        flex-basis: 100%;
      }
    }

    .outcome__element {
      display: flex;
      flex-direction: column;

      .element__title {
        font-size: 35px;
        margin-bottom: 10px;
        color: #af731f;
      }

      .element__description {
        filter: brightness(0.8);
        letter-spacing: 0.5px;
        font-family: "Nunito";
      }
    }
  }
}

div {
  color: white;
  // background-color: red;
}
</style>
