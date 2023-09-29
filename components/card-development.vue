<template>
  <CardBody>
    <div class="w-full image-container bg-contain bg-no-repeat" data-te-toggle="tooltip" v-bind:title="development?.title" :style="{ 'background-image': 'url(/gamedata/actions/views/' + card.type + '-white.png)' }"></div>
    <div class="font-larger line-height-fix">
      <Info :tooltip="`Requires ${development?.foodCost} food to gain`">
        <span>{{ development?.foodCost }}</span>
        <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span>
      </Info>
      <span class="icon-fix transform-icon"><Icon name="mdi:arrow-right-bold-outline"/></span>
      <Info class="info-padding" :tooltip="development?.title + ' provides you with ' + development?.culture + ' culture when gained'">
        <span>{{ development?.culture }}</span>
        <span class="icon-fix"><Icon name="bi:fire"/></span>
      </Info>
    </div>
  </CardBody>
</template>

<style scoped>
.image-container {
  aspect-ratio: 5/4;
  margin-bottom: 10%;
  margin-top: 20%;
  width: 100%;
}

.line-height-fix {
  line-height: 140%;
}

.info-padding {
  margin-top: 5%;
}

.transform-icon {
  display: inline-block;
  padding-left: 2.5%;
  padding-right: 2.5%;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/game";
import { Development } from "../types/development";

const props = defineProps<{ card: Card }>();

const { data } = await useAsyncData("actions", () => queryContent("gamedata", "actions", "cards").find());
const developments: Development[] = (data as any)._rawValue;

const development = ref(developments.find(value => value.title.toLowerCase().replaceAll(" ", "-") === props.card.type));
</script>