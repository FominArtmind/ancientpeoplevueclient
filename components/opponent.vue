<template>
  <div class="opponent-area" :style="opponentAreaMaxWidthStyle">
    <div class="adaptive-text-container">
      <h1 class="adaptive-text text-center">{{ player.nick }} {{ player.food }}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> {{ player.culture }}<span class="icon-fix"><Icon name="bi:fire"/></span>, away {{ player.awayCardsCount }} units, deck size: {{ player.deckSize }} - {{ timeSpent }}</h1>
    </div>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <div class="adaptive-text-container" v-for="card in player.village">
        <CardUnit :card="card.card" />
        <div class="adaptive-text">{{ card.rotated ? 'Rotated' : '' }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.opponent-area {
  border: 1px solid white;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  width: 100%;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Player } from "../types/game";
import { DateTime } from "luxon";

const props = defineProps<{ player: Player, totalPlayers: number }>();
const timeSpent = computed(() => {
  return DateTime.fromMillis(props.player.timeTakenMs).toFormat("m:ss");
});

const opponentAreaMaxWidthStyle = computed(() => {
  const columns = props.player.village.length;
  const effectiveColumns = Math.max(columns, 5);
  const maxWidth = effectiveColumns * 160 + (effectiveColumns + 2) * 4 + 32;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => {
  const opponents = props.totalPlayers - 1;
  let minRowLength = 14;
  switch(opponents) {
    case 0: minRowLength = 14; break;
    case 1: minRowLength = 14; break;
    case 2: minRowLength = 7; break;
    case 3: minRowLength = 5; break;
    case 4: minRowLength = 4; break;
  }

  const rowLength = Math.ceil(props.player.village.length / 2);

  return {
  "grid-template-columns": Array(Math.max(minRowLength, rowLength)).fill("1fr").join(" ")
  };
});

</script>
