<template>
  <div class="draft-area" :style="draftAreaMaxWidthStyle">
    <h1 class="font-larger text-center pb-2 pt-2">Draft</h1>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <CardDevelopment v-for="card in developmentCards" :card="card" :selectable="true" />
      <CardUnit v-for="card in draft" :card="card" :selectable="true" />
    </div>
  </div>
</template>

<style scoped>
.draft-area {
  padding-bottom: 0.25rem;
  width: 100%;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, VillageCard } from "../types/game";
import { game } from "../composables/state";
// @ts-ignore
import { DateTime } from "luxon";

const draft = computed(() => {
  return game.value.state.draftCards;
});

const draftDeckSize = computed(() => {
  return game.value.state.draftDeckSize;
});

const developmentCards = computed(() => {
  return game.value.state.developmentCards;
});

const draftAreaMaxWidthStyle = computed(() => {
  const columns = draft.value.length + 3;
  const effectiveColumns = Math.max(columns, 5);
  const maxWidth = effectiveColumns * 160 + (effectiveColumns + 2) * 4;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => {
  const totalCells = draft.value.length + 3;
  // const rowLengthCells = Math.max(totalCells, 10);
  const rowLengthCells = Math.max(totalCells <= 10 ? totalCells : Math.max(Math.ceil(totalCells / 2), 10), 5);
  return {
    "grid-template-columns": `repeat(${rowLengthCells}, 1fr)`
  };
});

</script>
