<template>
  <div
    class="nav__item"
    :class="props.active ? 'active' : ''"
    @click="scrollTo(props.scrollId)"
  >
    <span class="index">0{{ props.index }} &nbsp;</span>
    <span class="title">{{ props.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { NavbarItem } from "../../types/OtherTypes";
const props = defineProps<NavbarItem>();
type EmitType = {
  (event: "navAction"): void;
};

const emit = defineEmits<EmitType>();

const scrollTo = (scrollId: string) => {
  let el = document.querySelector(`[data-nav-id="${scrollId}"]`);
  if (el) {
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 300);
    emit("navAction");
  }
};
</script>
