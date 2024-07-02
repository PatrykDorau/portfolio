<template>
  <Transition>
    <div v-if="displayInfo" class="mobile_info">
      This site serve's a portfolio purpose and it's highly recommended to
      experience in on desktop devices in order to catch visual 3D effects

      <div class="btn">Acknowgledge</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
let displayInfo = ref(false);

if (window.innerHeight <= 768) {
  displayInfo.value = true;
}
</script>
