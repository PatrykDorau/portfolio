<template>
  <div class="browser__window" :class="{ zoom: zoomState }" @click="zoom">
    <div class="window__bar">
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
    </div>
    <slot name="window-content"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let zoomState = ref(false);

const zoom = () => {
  zoomState.value = !zoomState.value;
};
</script>

<style lang="scss" scoped>
.browser__window {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1000px;
  margin-inline: auto;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid rgb(19, 20, 20);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 19px 12px;
  cursor: zoom-in;
  z-index: 2;
  transition: max-width 0.2s ease;

  &.zoom {
    cursor: zoom-out;
    max-width: 100dvw;
  }

  .window__bar {
    background-color: #0d0e0e !important;
    width: 100%;
    height: fit-content;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search {
      min-width: 30%;
      min-height: 30px;
      background-color: rgb(19, 20, 20);
      border-radius: 20px;
      padding: 5px 10px;

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
}
</style>
