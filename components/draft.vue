<template>
  <div class="draft-area" :style="draftAreaMaxWidthStyle">
    <h1 class="font-larger text-center">Draft</h1>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <CardDevelopment v-for="card in developmentCards" :card="card"/>
      <CardUnit v-for="card in draft" :card="card" />
    </div>
  </div>
</template>

<style scoped>
.draft-area {
  width: 100%;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, VillageCard } from "../types/game";
import { DateTime } from "luxon";

const props = defineProps<{ draft: Card[] }>();

const developmentCards = ref<Card[]>([
  { id: 0, type: 'tools'},
  { id: 0, type: 'new-lands'},
  { id: 0, type: 'rock-painting'}
]);

const draftAreaMaxWidthStyle = computed(() => {
  const columns = props.draft.length + 3;
  const effectiveColumns = Math.max(columns, 5);
  const maxWidth = effectiveColumns * 160 + (effectiveColumns + 2) * 4;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => {
  const totalCells = props.draft.length + 3;
  const rowLengthCells = Math.max(totalCells <= 10 ? totalCells : Math.ceil(totalCells / 2), 5);
  return {
    "grid-template-columns": `repeat(${rowLengthCells}, 1fr)`
  };
});

</script>
