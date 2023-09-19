<template>
  <div class="inline" data-te-toggle="tooltip" v-bind:title="tooltip">
    <slot />
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
const props = defineProps<{ tooltip: string }>();
</script>
