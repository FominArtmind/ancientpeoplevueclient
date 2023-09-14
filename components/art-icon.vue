<template>
  <div class="bg-contain bg-no-repeat text-center w-12 h-8 inline-block" :style="{ 'background-image': 'url(/gamedata/' + (resource ? 'resources' : 'units') + '/views/' + type + '-icon-white.png)' }">
  </div>
</template>

<style scoped>
.icon-box {
  height: 50px;
  /* background-size: 152px 232px; */
}
</style>

<script setup lang="ts">
const props = defineProps<{ type?: string, resource?: boolean }>();
</script>