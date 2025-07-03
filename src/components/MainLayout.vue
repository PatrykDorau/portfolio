<template>
  <div class="main">
    <NavComponent :hideNav="hideNav" />

    <div class="site__content">
      <MainPageComponent data-observer data-nav-id="1" />

      <ProjectListComponent data-observer :projects-active="projectsActive" />

      <SkillsComponent />

      <div class="about">
        <svg
          data-v-3001c0cf=""
          viewBox="0 0 1440 320"
          style="rotate: 180deg; background-color: #131414"
        >
          <path
            data-v-3001c0cf=""
            id="wave-2"
            fill="#0d0e0e"
            fill-opacity="1"
            d="M0,192L120,170.7C240,149,480,107,720,112C960,117,1200,203,1320,245.3L1440,288L1440,320L0,320Z"
          ></path>
        </svg>
        <div class="content__wrapper" data-nav-id="4">
          <div class="about__title main__title">ABOUT</div>
          <div class="w-limit">
            <div class="about__content">
              <div class="content__title">
                <div class="col">
                  <p class="title__main">Mid Front End Developer</p>
                  <p class="title__sub">
                    Bringing 4+ years of industry expertise since 2021
                  </p>
                </div>
                <motion.div
                  class="me col"
                  :whileHover="{ scale: 1.2 }"
                  :initial="{ scale: 0 }"
                  :whileInView="{ scale: 1 }"
                  :transition="{ type: 'spring' }"
                >
                  <img
                    src="../assets/images/me/me-small.jpg"
                    width="100"
                    alt=""
                  />
                </motion.div>
              </div>
              <div class="content__text about-bio-container">
                <p class="bio-intro-statement"></p>
                <p class="bio-detail-item">
                  Striving for excellence and optimized performance. Working
                  with Vue ecosystem (Vue.js, Vitest, Pinia) and TypeScript. My
                  professional philosophy is simple: grow, focus on the
                  essentials and deliver solid work.
                </p>
                <p class="bio-detail-item">
                  Privately, I like to go out for squash, or a game of football.
                  I was studying Math and emerged with bachelor's in data
                  analysis and statistics. My faith in Jesus is a key part of my
                  identity. These aspects of my life bring balance and a
                  grounded perspective to my professional carrer.
                </p>

                <div class="bio-mantra-section">
                  <span class="mantra-values">
                    <motion.span
                      class="mantra-item"
                      :whileInView="{ transform: 'translateY(0)' }"
                      :transition="{ duration: 0.2, delay: 0.1 }"
                      >Credibility</motion.span
                    >
                    <motion.span
                      class="mantra-item"
                      :whileInView="{ transform: 'translateY(0)' }"
                      :transition="{ duration: 0.2, delay: 0.3 }"
                      >Authenticity</motion.span
                    >
                    <motion.span
                      class="mantra-item"
                      :whileInView="{ transform: 'translateY(0)' }"
                      :transition="{ duration: 0.2, delay: 0.5 }"
                      >That's how I work</motion.span
                    >
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg
          data-v-3001c0cf=""
          viewBox="0 0 1440 320"
          style="rotate: 180deg; margin-top: -1px"
        >
          <path
            data-v-3001c0cf=""
            id="wave-3"
            fill="#131414"
            fill-opacity="1"
            d="M0,192L120,170.7C240,149,480,107,720,112C960,117,1200,203,1320,245.3L1440,288L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
    <FooterComponent />
    <workAvailability :manage-position="true" />
  </div>
</template>

<script setup lang="ts">
import MainPageComponent from "./MainPage/MainPageComponent.vue";
import SkillsComponent from "./Skills/SkillsComponent.vue";
import ProjectListComponent from "./Projects/ProjectListComponent.vue";
import NavComponent from "./Navbar/NavComponent.vue";
import workAvailability from "./WorkAvailability/workAvailability.vue";
import FooterComponent from "./footer/FooterComponent.vue";
import { computed, onMounted, ref, onUnmounted } from "vue";
import { motion } from "motion-v";

import { useCalculateWavePath } from "../composables/useCalculateWavePath";
import { useCalculateScrollProgress } from "../composables/useCalculateScrollProgress";
const { getElementScrollProgress } = useCalculateScrollProgress();
const { updateWavePath } = useCalculateWavePath();

let hideNav = ref(false);
let loaded = ref(false);

let projectsActive = computed(() => {
  return navigationItems.value.some(
    (el) => el.active === true && el.title === "Projects"
  );
});

let navigationItems = ref([
  {
    title: "About",
    id: 1,
    scrollId: "1",
    active: true,
  },
  {
    title: "Projects",
    scrollId: "2",
    id: 2,
    active: false,
  },
  {
    title: "Contact",
    scrollId: "3",
    id: 3,
    active: false,
  },
]);

const brickAnimationSpecs = [
  // Brick 0 (Top)
  {
    index: 0,
    translation: { startX: 0, endX: 80, startY: 0, endY: 300 }, // Falls right and down
    rotation: { startDeg: 0, endDeg: 90 }, // Rotates 90 degrees
    opacity: { start: 1, end: 0 },
    progressWindow: [0.1, 0.9], // Animates when heroScrollProgress is between 0.1 and 0.3
  },
  // Brick 1 (Middle-Left)
  {
    index: 1,
    translation: { startX: 0, endX: -150, startY: 0, endY: 350 }, // Falls far left and down
    rotation: { startDeg: 0, endDeg: -120 }, // Rotates left
    opacity: { start: 1, end: 0 },
    progressWindow: [0.2, 0.9], // Starts after brick 0
  },
  // Brick 2 (Middle-Right)
  {
    index: 2,
    translation: { startX: 0, endX: 150, startY: 0, endY: 350 }, // Falls far right and down
    rotation: { startDeg: 0, endDeg: 120 }, // Rotates right
    opacity: { start: 1, end: 0 },
    progressWindow: [0.25, 0.9], // Starts slightly after brick 1
  },
  // Brick 3 (Bottom-Left)
  {
    index: 3,
    translation: { startX: 0, endX: -250, startY: 0, endY: 400 }, // Falls very far left and down
    rotation: { startDeg: 0, endDeg: -180 }, // Rotates even more
    opacity: { start: 1, end: 0 },
    progressWindow: [0.3, 0.9], // Starts after middle bricks
  },
  // Brick 4 (Bottom-Center)
  {
    index: 4,
    translation: { startX: 0, endX: 0, startY: 0, endY: 450 }, // Falls straight down
    rotation: { startDeg: 0, endDeg: 60 }, // Slight rotation
    opacity: { start: 1, end: 0 },
    progressWindow: [0.35, 0.9], // Starts after brick 3
  },
  // Brick 5 (Bottom-Right)
  {
    index: 5,
    translation: { startX: 0, endX: 250, startY: 0, endY: 400 }, // Falls very far right and down
    rotation: { startDeg: 0, endDeg: 180 }, // Rotates even more
    opacity: { start: 1, end: 0 },
    progressWindow: [0.4, 0.7], // Starts after brick 4, ends last
  },
];

let scrollHandler: (() => void) | null = null;

onMounted(() => {
  loaded.value = true;
  const heroSectionElement = document.querySelector(
    ".main_page"
  ) as HTMLElement;
  const projectsSectionElement = document.querySelector(
    ".project__section"
  ) as HTMLElement;
  const skillsSectionElement = document.querySelector(
    ".skills__wrapper"
  ) as HTMLElement;
  const aboutSectionElement = document.querySelector(".about") as HTMLElement;

  const pageTitleElement = document.querySelector(
    ".page__title"
  ) as HTMLElement;
  const fastForwardModelElement = document.querySelector(
    ".model-wrapper"
  ) as HTMLElement;

  const bricks = document.querySelectorAll(".brick") as NodeListOf<HTMLElement>;
  const skills = document.querySelectorAll(
    ".skills .skill"
  ) as NodeListOf<HTMLElement>;
  const elements = document.querySelectorAll(
    ".background__effect .element"
  ) as NodeListOf<HTMLElement>;

  const projects = document.querySelectorAll(
    ".project-list-item"
  ) as NodeListOf<HTMLElement>;
  // const effectContainer = document.querySelector(
  //   ".background__effect"
  // ) as HTMLElement;
  const projectsTitle = document.querySelector(
    ".projects__title"
  ) as HTMLElement;
  const wave = document.querySelector("#wave") as HTMLElement;
  const wave1 = document.querySelector("#wave-1") as HTMLElement;
  const wave2 = document.querySelector("#wave-2") as HTMLElement;
  const wave3 = document.querySelector("#wave-3") as HTMLElement;
  const wave4 = document.querySelector("#wave-4") as HTMLElement;
  const skillsTitle = document.querySelector(".skills__title") as HTMLElement;
  const aboutTitle = document.querySelector(".about__title") as HTMLElement;
  const aboutContent = document.querySelector(".about__content") as HTMLElement;

  const baseMinHeight = 60;
  const initialRandomVariation = 34;

  const initialHeights = Array.from(elements).map(() => {
    return baseMinHeight + Math.random() * initialRandomVariation;
  });

  elements.forEach((element, index) => {
    element.style.height = `${initialHeights[index]}%`;
  });

  let prevScrollPosition = window.pageYOffset;
  // const isMobile = window.innerWidth < 1000;

  scrollHandler = () => {
    const currentScrollY = window.scrollY;
    const newHideNavState = !(prevScrollPosition >= currentScrollY);

    if (newHideNavState !== hideNav.value) {
      hideNav.value = newHideNavState;
    }
    prevScrollPosition = currentScrollY;

    let heroSectionHeight = heroSectionElement.offsetHeight;
    let heroScrollProgress = Math.min(1, currentScrollY / heroSectionHeight);

    const projectScrollProgress = getElementScrollProgress(
      currentScrollY,
      projectsSectionElement
    );

    const skillsScrollProgress = getElementScrollProgress(
      currentScrollY,
      skillsSectionElement
    );

    const aboutScrollProgress = getElementScrollProgress(
      currentScrollY,
      aboutSectionElement
    );

    if (pageTitleElement) {
      pageTitleElement.style.transform = `translateY(-${heroScrollProgress * 20}vw)`;
      pageTitleElement.style.opacity = `${1 - heroScrollProgress}`;
    }
    if (fastForwardModelElement) {
      fastForwardModelElement.style.transform = `translateY(${heroScrollProgress * 100}vw)`;
      fastForwardModelElement.style.opacity = `${1.2 - heroScrollProgress}`;
    }

    if (skillsTitle) {
      const newSkillsTopValue = 100 - projectScrollProgress * 110;

      skillsTitle.style.top = `${newSkillsTopValue}%`;
    }

    if (skills.length > 0) {
      const totalRows = skills.length / 2;
      const easingStrength = 0.9;

      function easeOutCubic(t: number) {
        return 1 - Math.pow(1 - t, 3);
      }

      function rowEasing(
        progress: number,
        rowIndex: number,
        totalRows: number,
        strength: number
      ) {
        const delay = (rowIndex / (totalRows - 1)) * strength;
        const adjusted = (progress - delay) / (1 - delay);
        return easeOutCubic(Math.min(1, Math.max(0, adjusted)));
      }

      skills.forEach((skill, index) => {
        const rowIndex = Math.floor(index / 2);
        const easedProgress = rowEasing(
          projectScrollProgress,
          rowIndex,
          totalRows,
          easingStrength
        );
        const finalTranslateX = (1 - easedProgress) * 110;

        skill.style.transform =
          index % 2 === 0
            ? `translateX(-${finalTranslateX}%)`
            : `translateX(${finalTranslateX}%)`;
      });
    }

    if (projectsTitle) {
      const newTopValue = 100 - heroScrollProgress * 110; // Multiplying by 100 for vh or %

      projectsTitle.style.top = `${newTopValue}%`; // Or 'px', or '%' as needed
    }

    if (projects) {
      projects.forEach((element, index) => {
        const animationProgress = Math.max(0, Math.min(1, heroScrollProgress));
        let startTranslateY;

        const smallDesktopBreakpoint = 800;
        const mediumDesktopBreakpoint = 1320;
        const largeDesktopBreakpoint = 1520;

        if (window.innerWidth < smallDesktopBreakpoint) {
          startTranslateY = 0;
        } else if (window.innerWidth < mediumDesktopBreakpoint) {
          startTranslateY = -10;
        } else if (window.innerWidth < largeDesktopBreakpoint) {
          startTranslateY = -40;
        } else {
          startTranslateY = -60;
        }

        let adjustedProgress = animationProgress;

        const slownessFactor = 0.4;

        const totalElements = projects.length;
        if (totalElements > 1) {
          const normalizedIndex = index / (totalElements - 1);
          const speedMultiplier = 1.5 - slownessFactor * normalizedIndex;
          adjustedProgress = animationProgress * speedMultiplier;
        }

        adjustedProgress = Math.max(0, Math.min(1, adjustedProgress));

        const finalTranslateY = startTranslateY * (1 - adjustedProgress);

        element.style.transform = `translateY(${finalTranslateY}%)`;
      });
    }

    if (aboutTitle) {
      const newSkillsTopValue = 100 - skillsScrollProgress * 150;

      aboutTitle.style.top = `${newSkillsTopValue}%`;
    }

    if (aboutContent) {
      const newSkillsTopValue = 110 - skillsScrollProgress * 100;

      aboutContent.style.transform = `translateY(${newSkillsTopValue}%)`;
    }

    if (bricks.length === 6 && heroScrollProgress > 0.01) {
      // Ensure all 6 bricks are present

      brickAnimationSpecs.forEach((spec) => {
        const brick = bricks[spec.index];
        if (!brick) return; // Safeguard if brick index is out of bounds

        // Calculate progress for this specific brick's animation window
        const [startProgress, endProgress] = spec.progressWindow;
        let brickSpecificProgress =
          (heroScrollProgress - startProgress) / (endProgress - startProgress);

        // Clamp progress between 0 and 1
        brickSpecificProgress = Math.max(0, Math.min(1, brickSpecificProgress));

        // Interpolate translation
        const currentTranslateX =
          spec.translation.startX +
          (spec.translation.endX - spec.translation.startX) *
            brickSpecificProgress;
        const currentTranslateY =
          spec.translation.startY +
          (spec.translation.endY - spec.translation.startY) *
            brickSpecificProgress;

        // Interpolate rotation
        const currentRotateDeg =
          spec.rotation.startDeg +
          (spec.rotation.endDeg - spec.rotation.startDeg) *
            brickSpecificProgress;

        // Interpolate opacity
        const currentOpacity =
          spec.opacity.start +
          (spec.opacity.end - spec.opacity.start) * brickSpecificProgress;

        // Apply the transformations and opacity
        brick.style = `transform: translate(${currentTranslateX}px, ${currentTranslateY}px) rotate(${currentRotateDeg}deg) !important; opacity: ${currentOpacity} !important;`;
      });
    }

    let maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

    if (maxScrollY <= 0) {
      maxScrollY = 1;
    }

    const scrollEffectStart = 0;
    const scrollEffectEnd = maxScrollY;

    let backgroundScrollProgress =
      (currentScrollY - scrollEffectStart) /
      (scrollEffectEnd - scrollEffectStart);

    backgroundScrollProgress = Math.max(
      0,
      Math.min(1, backgroundScrollProgress)
    );

    updateWavePath(heroScrollProgress, wave);
    updateWavePath(projectScrollProgress, wave1);
    updateWavePath(skillsScrollProgress, wave2);
    updateWavePath(aboutScrollProgress, wave3);
    updateWavePath(backgroundScrollProgress, wave4);
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

<style lang="scss">
.progress-bar {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* background: #222; */
  z-index: 1000;

  svg {
    position: relative;
    width: 30px;
    height: 30px;
    z-index: 1000;

    :first-child {
      stroke: rgba(255, 255, 255, 0.08) !important;
    }

    :nth-child(2) {
      stroke: #af731f;
      stroke-dasharray: 62.83;
      stroke-dashoffset: 62;
    }

    circle {
      width: 100%;
      height: 100%;
      fill: none;
      stroke-width: 5px;
      stroke-linecap: round;
      transform: translate(5px, 5px);
      stroke-linecap: round;
    }
  }
}

.nav__menu {
  position: fixed;
  top: 0px;
  z-index: 10;
  border-bottom: 2px solid rgba(255, 255, 255, 0.08);
  background-color: #0d0e0e !important;
  padding: 10px 15px;
  width: 100%;
  margin-inline: auto;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: slideToBottom 300ms 500ms ease forwards;

  @media (max-width: 440px) {
    gap: 10px;
    padding: 5px 10px;
  }

  @keyframes slideToBottom {
    from {
      transform: translateY(-80px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  #nav-border {
    transition: d 0.2s ease-in-out;
  }

  .resume {
    width: fit-content;
    margin-left: 10px;
    background-color: #af731f;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    box-shadow: inset 0 0 0 -1px #131414;
    border: 2px solid transparent;

    &:hover {
      box-shadow: inset 0 50px 0 -1px #131414;
      border: 2px solid rgba(255, 255, 255, 0.04);
      border-radius: 10px;
    }
  }

  &.hide {
    top: -80px;
  }

  .nav__items {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    text-transform: capitalize;

    @media (max-width: 440px) {
      gap: 10px;
    }

    .items__element {
      transition: all 0.2s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      &::before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
        transition: all 0.4s ease;
        opacity: 0;
      }

      &:hover {
        &::before {
          opacity: 1;
          background-color: #af731f;
        }
      }
    }
  }
}

.about {
  // position: sticky;
  // bottom: 0;

  font-family: "Nunito";
  overflow: hidden;
  z-index: 4;

  // width: 800px;
  // max-width: 1200px;
  width: 100%;
  margin-inline: auto;

  display: flex;
  flex-direction: column;

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

  .content__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 120px 35px;
    background-color: #131414;
    position: relative;

    .w-limit {
      z-index: 1;
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      max-width: 900px;
      margin-inline: auto;

      @media (max-width: 1000px) {
        flex-direction: column-reverse;
      }

      @media (max-width: 1320px) {
        margin-inline: 0;
      }
    }
  }

  .about__title {
    font-size: 25vw;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    color: #0d0e0e;

    text-align: justify;

    display: flex;
    align-items: center;
    // justify-content: center;
    z-index: 0;
  }

  .about__socials {
    font-family: "Nunito";
    background-color: var(--neumorphic-bg);
  }

  .about__image {
    z-index: 2;

    img {
      max-width: 100%;
    }
  }

  .about__content {
    color: white;
    font-size: 22px;
    z-index: 2;
    position: relative;

    .content__title {
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 25px;
      flex-wrap: wrap;

      .title__main {
        font-size: 2.5rem;
      }

      .title__sub {
        font-size: 1.5rem;
      }

      .me {
        background-color: #0d0e0e !important;
        border-radius: 50% 50% 50% 0;
        border: 2px solid rgba(255, 255, 255, 0.04);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 19px 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        overflow: hidden;

        img {
          border-radius: 50%;
          // rotate: -45deg;
        }
      }
    }

    .content__text {
      color: #868686;
      font-size: 15px;
      font-family: "Nunito";

      .math-emphasis {
        font-weight: 600;
        color: #cccccc;
      }

      .bio-detail-item {
        margin-bottom: 2px;
        font-size: 1.1rem;
        font-family: "Nunito";
        letter-spacing: 0.2px;

        * {
          font-family: "Nunito";
        }
      }

      .bio-intro-statement {
        font-size: 2rem;
        margin-bottom: 0.8em;
        color: #ffffff;
        filter: brightness(1) !important;
      }

      .highlight-q {
        font-family: "Nunito";
        display: block;
        font-size: 1.2rem;
      }

      .blunt-detail {
        font-weight: 400;
      }

      .bless-emphasis {
        font-weight: 700;
        font-style: normal;
        color: #cccccc;
      }

      .bio-main-details {
        margin-bottom: 2em;
        text-align: left;
      }

      .math-emphasis {
        font-weight: 600;
      }

      .bio-mantra-section {
        margin-top: 2.5em;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .mantra-prefix {
        font-size: 1rem; /* Smaller, introductory text */
        opacity: 0.7;
        margin-bottom: 5px; /* Small space below */
      }

      .mantra-values {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 1.8rem;
        font-weight: 800;
        color: white;
        text-transform: uppercase;
        letter-spacing: 2px;
        overflow: hidden;

        .mantra-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          transform: translateY(100%);
          // top: 100px;

          &::before {
            display: block;
            content: "";
            width: 10px;
            height: 10px;
            background-color: #af731f;
            border-radius: 50%;
            // top: 50%;
            // transform: translate(0, -50%);
          }
        }
      }

      /* --- Responsive Adjustments --- */
      @media (max-width: 768px) {
        .bio-intro-statement {
          font-size: 1.8rem;
        }
        .bio-blunt-truth {
          font-size: 1.1rem;
          padding: 10px 15px;
        }
        .highlight-q {
          font-size: 1.2rem; /* Keep question prominent */
        }
        .bio-main-details {
          font-size: 1rem;
        }
        .mantra-values {
          font-size: 1.4rem;
          gap: 5px;
          letter-spacing: 1px;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
