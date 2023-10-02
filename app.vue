<template>
  <Link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap" rel="stylesheet" />
  <div class="flex w-screen h-screen bg-image bg-cover select-none">
    <div class="w-1/5 h-screen overflow-hidden">
      <StateArea class="h-28" />
      <ChatArea class="h-[calc(100%-160px)]" />
      <ChatSendBox class="h-12" />
    </div>
    <div class="w-4/5">
      <PlayArea />
    </div>
  </div> 
</template>

<style scoped>
.bg-image {
  background-image: url("./assets/intro-bg.png");
}
</style>

<script setup lang="ts">
import "tw-elements/dist/css/tw-elements.min.css";
import { onMounted, provide } from "vue";
// @ts-ignore
import { Tooltip, Popover, Ripple, initTE } from "tw-elements";
import { ref } from "vue";

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
}
onMounted(() => {
  initTE({ Tooltip, Popover, Ripple });
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
provide("windowWidth", windowWidth);
provide("windowHeight", windowHeight);

</script>