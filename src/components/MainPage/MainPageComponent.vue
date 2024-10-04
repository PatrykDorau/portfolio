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
          <p class="home_text_p1">
            {{ currentYear.getFullYear() }}
          </p>
          <div class="home_text_p2">
            <p class="home_description">
              <div class="fl">
                <span>Yo! My name is</span>
                <WavyTextComponent text="Patryk" bg-size="80px" bgPos="75%" />
              </div>
              <span class="sl"
                >I am a dedicated front-end developer. <br> I have decided that it
                is high time to move forward!</span
              >
              <div class="buttons">
                <div class="arrow__container" @click="scrollTo('2')">
                  <span class="indicator">→</span>
                  <WavyTextComponent
                    text="Projects"
                    bg-size="60px"
                  />
                </div>
                <div class="arrow__container" @click="scrollTo('3')">
                  <span class="indicator">→</span>
                  <WavyTextComponent
                    text="Contact"
                    bg-size="60px"
                  />
                </div>
              </div>
            </p>
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
        <p class="content">Vue | TS | SASS | HTML | GIT | Threejs | Blender</p>
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
import { onMounted, ref } from "vue";

let loaded = ref(false);

let currentYear = new Date();

onMounted(() => {
  loaded.value = true;
});

const scrollTo = (scrollId: string) => {
  let el = document.querySelector(`[data-nav-id="${scrollId}"]`);
  if (el) {
      el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
