<template>
  <span v-if="props.preText" :class="props.customClass">{{
    props.preText
  }}</span>
  <span
    :class="[props.customClass, { glitch: props.play }]"
    :data-text="props.preGlitch"
    :data-hover="props.glitch"
  >
    <span :class="[{ hidden: !props.play }]" class="glitch-before">{{
      displayedText
    }}</span>
    <span>{{ displayedText }}</span>
    <span :class="[{ hidden: !props.play }]" class="glitch-after">{{
      displayedText
    }}</span>
  </span>
  <span v-if="props.postText" :class="props.customClass">{{
    props.postText
  }}</span>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { GlitchEffect } from "../../types/OtherTypes";

const props = defineProps<GlitchEffect>();
let displayedText = ref(props.preGlitch);

watch(
  () => props.preGlitch,
  (newVal) => {
    displayedText.value = newVal;
  }
);

const setGlitchEffect = (text: string) => {
  setTimeout(() => (displayedText.value = text), 500);
};

function getRandomInterval(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function fireFunctionRandomly() {
  setGlitchEffect(props.glitch);
  setTimeout(() => {
    setGlitchEffect(props.preGlitch);
  }, 5000);

  // Get a random interval between 1 and 5 seconds (1000 to 5000 milliseconds)
  const randomInterval = getRandomInterval(10000, 15000);

  // Schedule the function to fire again after the random interval
  setTimeout(fireFunctionRandomly, randomInterval);
}

fireFunctionRandomly();
</script>
