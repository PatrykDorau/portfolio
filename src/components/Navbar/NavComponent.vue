<template>
  <div
    class="nav"
    :class="[
      {
        open: navToggled,
      },
      {
        close: closeState,
      },
    ]"
  >
    <div @click="toggleNav" class="nav__top">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48"
        height="48"
        class="icons-style"
      >
        <title>Menu</title>
        <circle
          cx="12"
          cy="12"
          r="3"
          opacity="1"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></circle>
        <circle
          cx="24"
          cy="12"
          r="3"
          opacity="1"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></circle>
        <circle
          cx="36"
          cy="12"
          r="3"
          opacity="1"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></circle>
        <circle
          cx="36"
          cy="24"
          r="3"
          opacity="1"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></circle>
        <circle
          cx="36"
          cy="36"
          r="3"
          opacity="1"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></circle>
        <circle
          cx="24"
          cy="36"
          r="3"
          opacity="1"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></circle>
        <circle
          cx="12"
          cy="36"
          r="3"
          opacity="1"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></circle>
        <circle
          cx="12"
          cy="24"
          r="3"
          opacity="1"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></circle>
        <rect
          x="21"
          y="21"
          width="6px"
          height="6px"
          rx="3"
          ry="3"
          opacity="0.75"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></rect>
        <rect
          x="21"
          y="21"
          width="6px"
          height="6px"
          rx="3"
          ry="3"
          opacity="0.75"
          transform-origin="0px 0px"
          style="transform: none; transform-origin: 0px 0px"
        ></rect>
      </svg>
    </div>

    <div class="nav__overlay">
      <div class="nav__content">
        <div class="social">
          <a href="/public/CV.pdf" target="_blank" type="application/pdf">
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/document.png"
              alt="document"
            />
            <span>Resume</span>
          </a>
          <div
            class="clipboard_wrapper"
            @click="copyToClipboard('dorau.patryk1@gmail.com', $event)"
          >
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/new-post.png"
              alt="new-post"
            />
            <span>Email</span>
          </div>
          <div
            class="clipboard_wrapper"
            @click="copyToClipboard('730798773', $event)"
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/apple-phone.png"
              alt="apple-phone"
            />
            <span>Phone</span>
          </div>
        </div>
        <div class="navigation">
          <NavItem
            v-for="(item, index) in props.navigationData"
            :index="index + 1"
            :title="item.title"
            :scrollId="item.scrollId"
            :active="item.active"
            :key="item.scrollId + index"
            @nav-action="toggleNav"
          />
        </div>
        <div class="social">
          <a
            href="https://www.linkedin.com/in/patryk-dorau-018467216/"
            target="_blank"
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/30/FFFFFF/linkedin.png"
              alt="linkedin"
            />
            <span>Linkedin</span>
          </a>
          <a href="https://www.facebook.com/patryk.dorau.5" target="_blank">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/30/FFFFFF/facebook--v1.png"
              alt="facebook--v1"
            />
            <span>Facebook</span>
          </a>
          <a href="https://github.com/PatrykDorau" target="_blank">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/glyph-neue/64/FFFFFF/github.png"
              alt="github"
            />
            <span>Github</span>
          </a>
        </div>
      </div>
      <ModelWindowComponent
        class="desktop"
        :resize-max="300"
        canvas-class="logo"
        container-class="logo-model"
        modelPath="logo.glb"
        animation="ff"
        :cameraPosition="{ x: 0, y: 0, z: 25 }"
        :modelPosition="{ x: -1, y: -5, z: -25 }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavItem from "./NavItemComponent.vue";
import ModelWindowComponent from "../ModelWindowComponent.vue";
import { ref } from "vue";

let navToggled = ref(false);
let closeState = ref(false);

interface NavigationItem {
  title: string;
  id: number;
  scrollId: string;
  active: boolean;
}

const props = defineProps<{ navigationData: NavigationItem[] }>();

const toggleNav = () => {
  if (navToggled.value) {
    closeState.value = true;
    setTimeout(() => {
      navToggled.value = false;
    }, 500);
  } else {
    closeState.value = false;
    setTimeout(() => {
      navToggled.value = true;
    }, 100);
  }
};

const copyToClipboard = (text: string, event: Event) => {
  (event.target as HTMLElement).classList.toggle("show_clipboard_msg");
  setTimeout(() => {
    (event.target as HTMLElement).classList.toggle("show_clipboard_msg");
  }, 1000);
  navigator.clipboard.writeText(text);
};
</script>
