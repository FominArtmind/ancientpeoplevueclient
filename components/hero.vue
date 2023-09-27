<template>
  <div class="hero-area-container">
    <div class="hero-area" :style="heroAreaMaxWidthStyle">
      <div class="adaptive-text-container">
        <h1 class="adaptive-text text-center pb-2 pt-2">Village {{ food }}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> {{ culture }}<span class="icon-fix"><Icon name="bi:fire"/></span> away {{ awayCardsCount }} deck {{ deckSize }} - {{ timeSpent }}<span class="inline-block pl-2" :class="{ 'action-required': action }">{{ action ? action : 'Wait for other players' }}</span></h1>
      </div>
      <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
        <div class="adaptive-text-container" v-for="card in village">
          <CardUnit :card="card.card" :rotated="card.rotated" />
          <!--<div class="adaptive-text">{{ card.rotated ? 'Rotated' : '' }}</div> -->
        </div>
        <template v-if="hand.length > 0">
          <div class="flex justify-center items-center">
            <div class="hand-arrow"><Icon name="mdi:arrow-left-bold-outline"/></div>
          </div>
          <div class="adaptive-text-container" v-for="card in hand">
            <CardUnit :card="card" :suggested="true" />
            <!--<div class="adaptive-text">Hand</div> -->
          </div>
        </template>
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
.hero-area-container {
  border-top: 1px solid white;
  padding-bottom: 0.25rem;
  width: 100%;
}
.hero-area {
  width: 100%;
  /* position: absolute;
  bottom: 0;
  width: calc(80% - 2px); */
}

.hand-arrow {
  font-size: 2.5rem;
}
@media (max-width: 1023px) {
  .hand-arrow {
    font-size: 1rem;
  }
}
@media (min-width: 1024px) and (max-width: 1365px) {
  .hand-arrow {
    font-size: 1.75rem;
  }
}

@keyframes blink { 
  50% { color: #c4ecf8; } 
}
.action-required {
  animation: blink 1.75s infinite ease;
}
</style>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { Card, VillageCard } from "../types/game";
// @ts-ignore
import { DateTime } from "luxon";

const props = defineProps<{ hand: Card[], deckSize: number, village: VillageCard[], food: number, culture: number, awayCardsCount: number, timeTakenMs: number, action: string }>();

const windowWidth = inject<globalThis.Ref<number>>("windowWidth", ref(0));
const windowHeight = inject<globalThis.Ref<number>>("windowHeight", ref(0));

const timeSpent = computed(() => {
  return DateTime.fromMillis(props.timeTakenMs).toFormat("m:ss");
});

const heroAreaMaxWidthStyle = computed(() => {
  const columns = props.village.length + props.hand.length;
  const effectiveColumns = Math.max(columns, 5);
  const cardMaxSize = 180; // windowWidth.value > 1366 ? 180 : 120;
  const windowAdaptedCardMaxSize = Math.min(cardMaxSize, Math.round((windowHeight.value / 1080) * (windowHeight.value / windowWidth.value * 1920 / 1080) * cardMaxSize));
  console.log(windowAdaptedCardMaxSize);
  const maxWidth = effectiveColumns * windowAdaptedCardMaxSize + (effectiveColumns + 2) * 4 + 32;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => ({
  "grid-template-columns": Array(props.village.length).fill("1fr").join(" ") + " 2rem " + Array(props.hand.length).fill("1fr").join(" ")
}));

</script>
