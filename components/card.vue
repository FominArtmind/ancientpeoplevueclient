<template>
  <div class="w-40 h-60 m-1">
    <div
      class="w-full h-full card-bg-image block max-w-sm bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700"
      :class="{ 'border-4': selected, 'card-bg-image-selected': selected }"
      @click="selected = !selected"
    >
      Hello world!
      <!--<div class="relative bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
        <h1 class="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.card-bg-image {
  background-image: url("../assets/card-background.png");
}
.card-bg-image-selected {
  background-size: 152px 232px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['clickable']);
const msg = ref('Hello World!');
const selected = ref(false);
</script>