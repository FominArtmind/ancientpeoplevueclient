<template>
  <CardBody>
    <div class="w-full image-container bg-contain bg-no-repeat" :style="{ 'background-image': 'url(/gamedata/resources/views/' + card.type + '-white.png)' }"></div>
    <div class="mx-auto">
      <div><Icon name="teenyicons:arrow-up-outline"/><Icon name="teenyicons:arrow-up-outline"/><Icon name="teenyicons:arrow-up-outline"/></div>
      <div>15 <Icon name="bi:apple"/></div>
    </div>
  </CardBody>
</template>

<style scoped>
.image-container {
  aspect-ratio: 5/4;
  margin-top: 20%;
  width: 100%;
}
</style>

<script setup lang="ts">
import { Card } from "../types/game";

const props = defineProps<{ card: Card }>();
</script>