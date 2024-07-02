<script setup lang="ts">
import MainLayout from "./components/MainLayout.vue";
import BackgroundNoise from "./components/BackgroundNoiseComponent.vue";
</script>

<template>
  <BackgroundNoise />
  <!-- <div class="foreground"></div> -->
  <MainLayout msg="Everything has a beginning" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.foreground {
  background: linear-gradient(
    to bottom,
    hsla(200, 100%, 85%, 0) 0%,
    hsla(200, 100%, 85%, 0.013) 9.7%,
    hsla(200, 100%, 85%, 0.049) 18.1%,
    hsla(200, 100%, 85%, 0.104) 25.5%,
    hsla(200, 100%, 85%, 0.175) 31.9%,
    hsla(200, 100%, 85%, 0.259) 37.7%,
    hsla(200, 100%, 85%, 0.352) 43%,
    hsla(200, 100%, 85%, 0.45) 47.9%,
    hsla(200, 100%, 85%, 0.55) 52.8%,
    hsla(200, 100%, 85%, 0.648) 57.7%,
    hsla(200, 100%, 85%, 0.741) 63%,
    hsla(200, 100%, 85%, 0.825) 68.7%,
    hsla(200, 100%, 85%, 0.896) 75%,
    hsla(200, 100%, 85%, 0.951) 82.2%,
    hsla(200, 100%, 85%, 0.987) 90.5%,
    hsl(200, 100%, 85%) 100%
  );

  margin: 0;
  background-color: #101011;
  overflow-x: hidden;
  background-blend-mode: soft-light;
  position: fixed;
  top: -100%;
  left: -20%;
  right: -20%;
  bottom: -100%;
  opacity: 0.3;
  animation: slideSides 30s linear infinite;
}

@keyframes slideSides {
  0% {
    rotate: 0;
  }
  100% {
    rotate: 360deg;
  }
}
</style>
