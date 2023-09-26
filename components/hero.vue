<template>
  <div class="hero-area" :style="heroAreaMaxWidthStyle">
    <div class="adaptive-text-container">
      <h1 class="adaptive-text text-center">Village {{ food }}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> {{ culture }}<span class="icon-fix"><Icon name="bi:fire"/></span>, away {{ awayCardsCount }} units, deck size: {{ deckSize }} - {{ timeSpent }}</h1>
    </div>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <div class="adaptive-text-container" v-for="card in village">
        <CardUnit :card="card.card" />
        <div class="adaptive-text">{{ card.rotated ? 'Rotated' : '' }}</div>
      </div>
      <div></div>
      <div class="adaptive-text-container" v-for="card in hand">
        <CardUnit :card="card" />
        <div class="adaptive-text">Hand</div>
      </div>
    </div>
  </div>
  <!--<table class="table-fixed w-[calc(100% - 4px)]">
    <tr>
      <td class="px-1" v-for="card in village"><CardUnit :card="card.card" /></td>
      <td></td>
      <td class="px-1" v-for="card in hand"><CardUnit :card="card" /></td>
    </tr>
    <tr class="text-center">
      <td class="px-1 adaptive-text-container" v-for="card in village"><div class="adaptive-text">{{ card.rotated ? 'Rotated' : '' }}</div></td>
      <td></td>
      <td class="px-1 adaptive-text-container" :colspan="hand.length"><div class="adaptive-text">Hand</div></td>
    </tr>
  </table> -->
</template>

<style scoped>
.hero-area {
  width: 100%;
  /* position: absolute;
  bottom: 0;
  width: calc(80% - 2px); */
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, VillageCard } from "../types/game";
import { DateTime } from "luxon";

const props = defineProps<{ hand: Card[], deckSize: number, village: VillageCard[], food: number, culture: number, awayCardsCount: number, timeTakenMs: number }>();

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;

  console.log(windowWidth.value, windowHeight.value);
}
onMounted(() => {
  window.addEventListener("resize", handleResize);
})
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
})

const timeSpent = computed(() => {
  return DateTime.fromMillis(props.timeTakenMs).toFormat("m:ss");
});

const heroAreaMaxWidthStyle = computed(() => {
  const columns = props.village.length + props.hand.length;
  const effectiveColumns = Math.max(columns, 5);
  const windowAdaptedCardMaxSize = Math.min(160, Math.round((windowHeight.value / 1080) * (windowHeight.value / windowWidth.value * 1920 / 1080) * 160));
  const maxWidth = effectiveColumns * windowAdaptedCardMaxSize + (effectiveColumns + 2) * 4 + 32;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => ({
  "grid-template-columns": Array(props.village.length).fill("1fr").join(" ") + " 2rem " + Array(props.hand.length).fill("1fr").join(" ")
}));

</script>
