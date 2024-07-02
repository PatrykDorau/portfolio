<template>
  <div
    class="title__wave"
    ref="titleRef"
    :class="props.customClass"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="{ backgroundSize: props.bgSize, backgroundPositionY: props.bgPos }"
  >
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  customClass?: string;
  text: string;
  bgSize?: string;
  bgPos?: string;
}>();

const titleRef = ref<HTMLElement | null>(null);
let isAnimating = ref<boolean>(false);
let backgroundPositionX = ref<number>(22);
let animationFrame: number = 0;

const handleMouseEnter = (): void => {
  if (!isAnimating.value) {
    isAnimating.value = true;
    animateBackground();
  }
};

const handleMouseLeave = (): void => {
  isAnimating.value = false;
  cancelAnimationFrame(animationFrame);
};

const animateBackground = (): void => {
  if (isAnimating.value) {
    backgroundPositionX.value += 0.2; // Adjust the speed here
    if (titleRef.value) {
      titleRef.value.style.backgroundPositionX = `${backgroundPositionX.value}px`;
      animationFrame = requestAnimationFrame(animateBackground);
    }
  }
};
</script>
