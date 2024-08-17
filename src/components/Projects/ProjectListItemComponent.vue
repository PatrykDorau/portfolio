<template>
  <div
    class="list_item"
    :class="[{ disabled: disableHover }, { active: currentActive }]"
    :data-indicator="props.data.id"
    @mouseover="activate"
    @mouseleave="deactivate"
  >
    <div class="item_text_wrapper">
      <div class="item_title" :data-indicator="props.data.id">
        <p class="content">
          {{ props.data.title }}
          <span class="lock_info" @click="handlePreviewLock">
            {{ lockedPreview ? "Unlock Preview" : "Lock Preview" }}
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/hatch/64/lock-2.png"
              alt="lock-2"
            />
          </span>
          <span @click="markItem(!showPreview, true)" class="show_preview">
            Show Preview
          </span>
        </p>
      </div>
      <div class="item_text">
        <div class="item_desc">
          <div class="item_info">
            <div class="info_col">
              <p class="col_title">Stack</p>
              <p>
                {{ props.data.stack }}
              </p>
            </div>
            <div class="info_col">
              <p class="col_title">Team</p>
              <p>
                {{ props.data.team }}
              </p>
            </div>
            <div class="info_col">
              <p class="col_title">Year</p>
              <p>{{ props.data.year }}</p>
            </div>
          </div>
          <p class="desc_content">{{ props.data.description }}</p>
          <div v-if="props.data.flow" class="flow">
            <p
              class="flow_item"
              v-for="item in props.data.flow"
              :key="item.title"
            >
              <strong>{{ item.title }}:</strong> {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { ProjectItemData } from "../../types/OtherTypes";
const props = defineProps<ProjectItemData>();

const currentActive = ref(false);

let active = defineModel<boolean>("active");
let lockedPreview = defineModel<boolean>("lockedPreview");

let counter = 0;
let showPreview = ref(false);

watch(
  () => lockedPreview.value,
  (newVal) => {
    if (!newVal) {
      currentActive.value = false;
    }
  }
);

const disableHover = computed(() => {
  if (lockedPreview.value && !active.value) return true;
  else return false;
});

const handlePreviewLock = () => {
  lockedPreview.value = !lockedPreview.value;
  currentActive.value = !currentActive.value;
};
const activate = () => {
  startCounter();
};
const deactivate = () => {
  if (lockedPreview.value) return;
  clearCounter();
};

const startCounter = () => {
  clearTimeout(counter);
  counter = setTimeout(() => {
    markItem(true);
    // Fire your function when the counter reaches 500ms
    console.log("Counter reached 500ms");
    // Replace this console.log with your function call
  }, 400);
};

const clearCounter = () => {
  clearTimeout(counter);
  markItem(false);
};

const markItem = (type: boolean, force?: boolean) => {
  if (force) {
    active.value = type;
    setTimeout(() => {
      window.addEventListener(
        "click",
        () => {
          active.value = false;
          showPreview.value = false;
        },
        { once: true }
      );
    }, 500);
    return;
  }
  if (window.innerWidth > 768) active.value = type;
};
</script>
