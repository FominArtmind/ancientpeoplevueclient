<template>
  <div class="card-container m-1">
    <!--<div
      class="w-full h-full card-bg-image block max-w-sm bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700"
      :class="{ 'border-4': selected, 'card-bg-image-selected': selected }"
      @click="selected = !selected"
    >-->
    <div class="w-full h-full card-background">
      <div class="w-full h-full p-1 card text-center" :class="{ 'card-selected': selected }" @click="selected = !selected">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  aspect-ratio: 2/3;
  max-width: 160px;
  width: 100%;
  container-type: inline-size;
}

/* .card-bg-image {
  background-image: url("../assets/card-background.png");
}
.card-bg-image-selected {
  background-size: 152px 232px;
} */
.card-background {
  /* background-color: rgba(154, 182, 189, 0.35); */
  background-color: rgba(118, 139, 144, 0.35);
  font-size: 0.35rem;
}
@container (min-width: 40px) {
  .card-background {
    font-size: 0.5rem !important;
  }
}
@container (min-width: 80px) {
  .card-background {
    font-size: 0.7rem !important;
  }
}
@container (min-width: 120px) {
  .card-background {
    font-size: 1rem !important;
  }
}
.card {
  border: 2px solid rgb(154, 182, 189);
  opacity: 1;
}
.card-selected {
  border: 2px solid rgb(224, 240, 243);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['clickable']);
const msg = ref('Hello World!');
const selected = ref(false);
</script>