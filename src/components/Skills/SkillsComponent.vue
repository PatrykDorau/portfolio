<template>
  <div class="skills__wrapper" data-nav-id="3">
    <div class="skills">
      <div class="skills__title main__title">STACK</div>
      <div v-for="s in skills" :key="s.title" class="skill">
        <img
          :src="s.icon"
          :alt="`${s.title} icon`"
          :style="`background-color: ${s.bg}`"
          width="40"
          height="40"
        />
        <div class="skills__text">
          <p class="skill__title">
            {{ s.title }}
          </p>
          <p class="skill__desc">{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import vueIcon from "../../assets/icons/vue.svg";
import typescriptIcon from "../../assets/icons/typescript.svg";
import piniaIcon from "../../assets/icons/pinia.svg";
import gitIcon from "../../assets/icons/git.svg";
import jiraIcon from "../../assets/icons/jira.svg";
import figmaIcon from "../../assets/icons/figma.svg";
import bootstrapIcon from "../../assets/icons/bootstrap.svg";
import swaggerIcon from "../../assets/icons/swagger.svg";
import threeIcon from "../../assets/icons/three.svg";
import motionIcon from "../../assets/icons/motion.svg";
import axiosIcon from "../../assets/icons/axios.svg";
import vitestIcon from "../../assets/icons/vitest.svg";

let skills = [
  {
    title: "Vue.js",
    desc: "Framework",
    icon: vueIcon,
  },
  {
    title: "Typescript",
    desc: "Language",
    icon: typescriptIcon,
  },
  {
    title: "Pinia",
    desc: "Vue store",
    icon: piniaIcon,
  },
  {
    title: "Vitest",
    desc: "Test tool",
    icon: vitestIcon,
  },

  {
    title: "Axios",
    desc: "HTTP tool",
    icon: axiosIcon,
  },
  {
    title: "Three.js",
    desc: "3D Library",
    icon: threeIcon,
    bg: "white",
  },
  {
    title: "Motion one",
    desc: "Animation tool",
    icon: motionIcon,
    bg: "yellow",
  },
  {
    title: "Git",
    desc: "Control system",
    icon: gitIcon,
  },
  {
    title: "Bootstrap",
    desc: "Toolkit",
    icon: bootstrapIcon,
  },
  {
    title: "Swagger",
    desc: "API docs",
    icon: swaggerIcon,
  },
  {
    title: "Jira",
    desc: "Planner",
    icon: jiraIcon,
  },
  {
    title: "Figma",
    desc: "Design tool",
    icon: figmaIcon,
  },
];
</script>
