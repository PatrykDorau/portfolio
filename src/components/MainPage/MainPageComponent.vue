<template>
  <div class="main_page">
    <motion.div
      drag
      class="container"
      :class="{ hideWeb: shouldHideBar }"
      :whileDrag="{ scale: 0.9, cursor: 'grabbing' }"
      :dragConstraints="{ top: 0, right: 0, bottom: 0, left: 0 }"
      :dragTransition="{ bounceStiffness: 500, bounceDamping: 15 }"
    >
      <motion.div
        class="window__bar"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{
          duration: 0.2,
          delay: 0.2,
        }"
      >
        <div class="icons">
          <div class="icon"></div>
          <div class="icon"></div>
          <div class="icon"></div>
        </div>
        <div class="search">
          <p class="search__text">
            <slot name="title"></slot>
          </p>
        </div>
        <div class="icons">
          <div class="icon"></div>
        </div>
      </motion.div>
      <div class="pyramid">
        <div class="row">
          <div class="brick"></div>
        </div>
        <div class="row">
          <div class="brick"></div>
          <div class="brick"></div>
        </div>
        <div class="row">
          <div class="brick"></div>
          <div class="brick"></div>
          <div class="brick"></div>
        </div>
      </div>
    </motion.div>
    <div class="page__title" ref="pageTitleRef">
      <div class="title__main">
        <span
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.5, delay: 0.1 }"
          >I
        </span>
        <span class="build">
          <span><div>b</div></span>
          <span><div>u</div></span>
          <span><div>i</div></span>
          <span><div>l</div></span>
          <span><div>d</div></span>
        </span>
        <span
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.5, delay: 0.1 }"
        >
          stuff on web</span
        >
      </div>
      <motion.div
        class="subtitle"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        Hey there, I'm Patryk Dorau. This site is my works showcase. Currently
        @Cosmogroup.
      </motion.div>
      <motion.div
        class="subtitle"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        Committed to keeping it real - no AI copy, no sales speak, just the
        work.
      </motion.div>
      <motion.div
        class="explore"
        :animate="{ transform: 'translateY(0)' }"
        :transition="{ duration: 0.2, delay: 0.2 }"
      >
        <div class="explore__text">Explore</div>
        <div class="explore__line"></div>
        <div class="explore__socials">
          <motion.div
            v-for="(link, index) in links"
            :key="index"
            class="link__container"
            :while-hover="{ scale: 1.1 }"
            @mousemove="magnetEffect($event, 'img')"
            @mouseleave="resetEffect($event, 'img')"
          >
            <a :href="link.href" target="_blank">
              <motion.img
                width="30"
                height="30"
                :src="link.src"
                :alt="link.alt"
              />
            </a>
          </motion.div>

          <div
            class="button__container"
            @mousemove="magnetEffect($event, '.resume')"
            @mouseleave="resetEffect($event, '.resume')"
          >
            <a
              href="https://drive.google.com/file/d/17cOTRdCwn3LABR1cztGms3i8QbvISL3g/view?usp=sharing"
              target="_blank"
              class="resume"
              >Resume</a
            >
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScroll, motion } from "motion-v";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useMagnetEffect } from "../../composables/useMagnetEffect";
const { magnetEffect, resetEffect } = useMagnetEffect();

const { scrollYProgress } = useScroll();

const currentScrollProgress = ref(0);

let unsubscribeScroll: (() => void) | null;

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
]);

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

const shouldHideBar = computed(() => {
  return currentScrollProgress.value > 0.04;
});
</script>

<style scoped lang="scss">
.window__bar {
  background-color: #0d0e0e !important;
  width: 100%;
  height: fit-content;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  transition: all 0.2s ease;

  .search {
    min-width: 30%;
    min-height: 20px;
    background-color: rgb(19, 20, 20);
    border-radius: 20px;
    padding: 5px 10px;
    flex: 1;

    .search__text {
      filter: brightness(0.9);
    }
  }

  .icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: fit-content;

    .icon {
      width: 15px;
      aspect-ratio: 1/1;
      border-radius: 50%;

      &:first-child {
        background-color: #af731f;
      }

      &:nth-child(2) {
        background-color: red;
      }
      &:nth-child(3) {
        background-color: green;
      }
    }
  }
}

.explore {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: white;
  gap: 10px;
  margin-top: 10px;
  transform: translateY(120%);

  .explore__line {
    flex: 1;
    flex-basis: 30%;
    height: 1px;
    background-color: #ccc;
  }

  .explore__socials {
    display: flex;
    align-items: center;
    padding-bottom: 5px;

    .link__container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        mix-blend-mode: difference;
        padding: 10px;
      }

      &::before {
        content: "";
        width: 2px;
        height: 2px;
        position: absolute;
        background-color: transparent;
        border-radius: 50%;
        transition: all 0.4s ease;
        z-index: -1;
      }
      &:hover {
        &::before {
          width: 40px;
          height: 40px;
          background-color: white;
        }
      }
    }

    .resume {
      padding: 5px 10px;
      flex: 1;
      border: 2px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: inset 0 0px 0 -1px rgb(175, 115, 31);
      transition: box-shadow 0.4s ease;

      &:hover {
        box-shadow: inset 0 -50px 0 -1px rgb(175, 115, 31);
      }
    }
  }
}

.container {
  position: sticky;
  top: 20px;
  z-index: 2;
  position: sticky;
  top: 20px;
  z-index: 2;
  cursor: grab;
  animation: updateWebWindow 0.2s 0.1s ease forwards;

  &.hideWeb {
    pointer-events: none;
    box-shadow: none !important;
    border: 2px solid transparent !important;
    background-color: transparent !important;
    .window__bar {
      opacity: 0 !important;
    }
  }
}

@keyframes updateWebWindow {
  100% {
    border: 2px solid rgb(19, 20, 20);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 19px 12px;
    border-radius: 15px;
    background-color: #0d0e0e;
  }
}

.me {
  position: fixed;
  top: 0;
  z-index: 100;
}

@keyframes slideUpAndFadeIn {
  0% {
    transform: translateY(100%); /* Start 100% down from its normal position */
  }
  100% {
    transform: translateY(0); /* End at its normal position */
  }
}

.build {
  display: inline-flex;
  position: relative;
  overflow: hidden;

  span {
    position: relative;
    overflow: hidden;
  }
}

/* Stagger the animation start for each letter */
.build span:nth-child(1) div {
  animation-delay: 0.4s;
}
.build span:nth-child(2) div {
  animation-delay: 0.5s;
}
.build span:nth-child(3) div {
  animation-delay: 0.6s;
}
.build span:nth-child(4) div {
  animation-delay: 0.7s;
}
.build span:nth-child(5) div {
  animation-delay: 0.8s;
}
.build div {
  filter: brightness(0.6);
  display: inline-block;
  transform: translateY(100%);
  animation: slideUpAndFadeIn 0.2s ease-out forwards;
  will-change: transform, opacity;
}

/* Add more if your word is longer */

.pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: relative;
  padding: 0 20px 20px;
}

.row {
  display: flex;
  gap: 5px;
}

.brick {
  width: 50px;
  height: 25px;
  background: white;
  filter: brightness(0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  animation: fall 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
  transform: translateY(-200vh) rotate(-15deg) scale(0.9);
  opacity: 0;
  position: relative;
}

@keyframes fall {
  0% {
    /* Replaced translateY with top */
    top: -200vh; /* Start 200% of viewport height above its initial position */
    transform: rotate(-15deg) scale(0.9); /* Keep these transform properties */
    opacity: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  80% {
    /* Replaced translateY with top */
    top: 10px; /* Moves 10px down from its initial static position */
    transform: rotate(2deg) scale(1.05); /* Keep these transform properties */
    opacity: 1;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
  100% {
    /* Replaced translateY with top */
    top: 0; /* Returns to its original static position */
    transform: rotate(0deg) scale(1); /* Keep these transform properties */
    opacity: 1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
}

/* Staggered delays */
.row:nth-child(1) .brick:nth-child(1) {
  animation-delay: 0.9s;
}
.row:nth-child(2) .brick:nth-child(1) {
  animation-delay: 0.7s;
}
.row:nth-child(2) .brick:nth-child(2) {
  animation-delay: 0.75s;
}
.row:nth-child(3) .brick:nth-child(1) {
  animation-delay: 0.3s;
}
.row:nth-child(3) .brick:nth-child(2) {
  animation-delay: 0.35s;
}
.row:nth-child(3) .brick:nth-child(3) {
  animation-delay: 0.3s;
}

.arrow {
  background-color: white;
  border-radius: 50%;
  padding: 10px;
  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 29px 26px;

  transition: all 0.5s ease;

  &.arrow--left {
    position: absolute;
    top: 50%;
    left: -100px;
    transform: translate(0, -50%);

    img {
      rotate: 180deg;
    }
  }

  &.arrow--right {
    position: absolute;
    top: 50%;
    right: -100px;
    transform: translate(0, -50%);
  }
}

.subtitle {
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;

  color: #ccc;
  font-size: 18px;
}
.page__title {
  margin-block: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  .title__main {
    color: white;
    font-weight: 700;
    font-size: 80px;
    line-height: 84px;
    overflow: hidden;
  }

  .title__company {
    // color: rgba(255, 255, 255, 0.7);
    color: white;
    filter: brightness(0.8);
    font-size: 22px;
  }
}

.main_page {
  z-index: 2;
}

.background__effect {
  // z-index: 20; /* Ensure it's behind content if other z-indexes are higher */
  position: fixed;
  left: 5px;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: transparent; /* Keep it transparent */
  /* Or align-items: center; if you want them centered vertically */

  overflow: hidden; /* Important: Prevents scrollbars if elements temporarily go out of bounds */
  pointer-events: none;

  .element {
    /* Common styles for all elements */
    flex-grow: 1; /* Makes all elements take equal width */
    min-width: 10px; /* Ensures they don't disappear on very small screens */
    background-color: rgba(255, 255, 255, 0.3); /* Semi-transparent white */
    border-radius: 2px;
    z-index: 1;

    /* Smooth transition for movement and height/scale changes */
    transition:
      // transform 0.5s ease,
      opacity 0.3s ease,
      left 0.3s ease,
      /* Added opacity to transition */ height 0.3s ease-out,
      box-shadow 0.3s ease,
      background-color 0.3s ease;

    /* Optional: Initial subtle movement using an animation */
    // animation: subtleFloat 10s ease-in-out infinite alternate;
    opacity: 0.15; /* Initial opacity for all elements */
    margin-block: auto;

    &.active {
      opacity: 1;
      border-radius: 60px;
      background-color: var(--neumorphic-bg);
      border: 2px solid rgba(255, 255, 255, 0.04);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 29px 26px;
    }
  }
}

.element--1 {
  position: absolute;
  width: calc(20% - 5px);
  top: 0; /* Add this */
  bottom: 0; /* Add this */
  left: 0%;
  height: 65%; /* Initial height, will be overridden by JS on scroll */
  animation-delay: 0.2s;

  &.hide {
    left: -110%;
  }
}
.element--2 {
  animation-delay: 0.4s;
  position: absolute;
  width: calc(20% - 5px);
  top: 0; /* Add this */
  bottom: 0; /* Add this */
  left: 20%;
  height: 77%; /* Initial height, will be overridden by JS on scroll */
}
.element--3 {
  animation-delay: 0.6s;
  position: absolute;
  width: calc(20% - 5px);
  top: 0; /* Add this */
  bottom: 0; /* Add this */
  left: 40%;
  height: 68%; /* Initial height, will be overridden by JS on scroll */
}
.element--4 {
  animation-delay: 0.8s;
  position: absolute;
  width: calc(20% - 5px);
  top: 0; /* Add this */
  bottom: 0; /* Add this */
  left: 60%;
  height: 88%; /* Initial height, will be overridden by JS on scroll */
}
.element--5 {
  animation-delay: 1s;
  position: absolute;
  width: calc(20% - 5px);
  top: 0; /* Add this */
  bottom: 0; /* Add this */
  left: 80%;
  height: 63%; /* Initial height, will be overridden by JS on scroll */

  &.hide {
    left: 110%;
  }
}

/* Subtle motion with staggered delays */
.background__effect .element--1 {
  animation-delay: 0s;
}
.background__effect .element--2 {
  animation-delay: 0.2s;
}
.background__effect .element--3 {
  animation-delay: 0.4s;
}
.background__effect .element--4 {
  animation-delay: 0.6s;
}
.background__effect .element--5 {
  animation-delay: 0.8s;
}
// You can remove the unused .element--6, .element--7, .element--8 if they don't exist
/*
.background__effect .element--6 {
  animation-delay: 1s;
}
.background__effect .element--7 {
  animation-delay: 1.2s;
}
.background__effect .element--8 {
  animation-delay: 1.4s;
}
*/

/* Keyframes for the subtle floating animation */
@keyframes subtleFloat {
  0% {
    transform: translateY(0px); /* Start at original position */
  }
  50% {
    transform: translateY(-40px); /* Move slightly up */
  }
  100% {
    transform: translateY(20px); /* Return to original position */
  }
}
</style>
