<template>
  <div class="background_noise"></div>

  <svg>
    <filter id="noiseFilter2">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.6"
        stitchTiles="stitch"
      />
    </filter>
  </svg>
</template>

<style scoped>
.background_noise {
  position: fixed;
  filter: url(#noiseFilter2);
  opacity: 12%;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.nav .background_noise {
  z-index: 12;
  position: absolute !important;
  opacity: 12%;
  top: 0;
  left: 0;
}

svg {
  position: absolute;
  z-index: 2;
}
</style>
