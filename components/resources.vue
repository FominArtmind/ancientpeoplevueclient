<template>
  <div class="resources-area" :style="resourcesAreaMaxWidthStyle">
    <h1 class="font-larger text-center pb-2 pt-2">Resources (deck size: {{ deckSize }})</h1>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <div class="adaptive-text-container" v-for="card in resources">
        <CardResource :card="card" />
        <!--<div class="adaptive-text"></div>-->
      </div>
      <div></div>
      <template v-for="player in players">
        <div class="adaptive-text-container" v-for="card in player.resources">
          <CardResource :card="card" :player="player.nick" />
          <!--<div class="adaptive-text">{{player.nick}}</div>-->
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.resources-area {
  padding-bottom: 0.25rem;
  width: 100%;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/game";

const props = defineProps<{ resources: Card[], deckSize: number, players: { nick: string, resources: Card[] }[] }>();

const totalAwayResources = computed(() => {
  return Object.values(props.players).map(value => value.resources.length).reduce((total, amount) => total += amount);
});
const resourcesAreaMaxWidthStyle = computed(() => {
  const columns = props.resources.length + totalAwayResources.value;
  const maxWidth = Math.max(columns, 5) * 160 + 32;
  console.log(totalAwayResources, maxWidth);
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => ({
  "grid-template-columns": Array(props.resources.length).fill("1fr").join(" ") + " 2rem " + Array(totalAwayResources.value).fill("1fr").join(" ")
}));
</script>