<template>
  <div class="opponent-area" :class="{ 'opponent-area-multiple-players': totalPlayers > 2 }" :style="opponentAreaMaxWidthStyle">
    <div class="adaptive-text-container">
      <h1 class="adaptive-text text-center pt-2 pb-2">{{ player.nick }} {{ player.food }}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> {{ player.culture }}<span class="icon-fix"><Icon name="bi:fire"/></span> away {{ player.awayCardsCount }} deck {{ player.deckSize }} - {{ timeSpent }}</h1>
    </div>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <div class="adaptive-text-container" v-for="card in player.village">
        <CardUnit :card="card.card" :rotated="card.rotated" />
        <!--<div class="adaptive-text">{{ card.rotated ? 'Rotated' : '' }}</div>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
.opponent-area {
  border-bottom: 1px solid white;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  width: 100%;
}
.opponent-area-multiple-players {
  border: 1px solid white;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Player } from "../types/game";
// @ts-ignore
import { DateTime } from "luxon";

const props = defineProps<{ player: Player, totalPlayers: number }>();

const windowWidth = inject<globalThis.Ref<number>>("windowWidth", ref(0));
const windowHeight = inject<globalThis.Ref<number>>("windowHeight", ref(0));

const timeSpent = computed(() => {
  return DateTime.fromMillis(props.player.timeTakenMs).toFormat("m:ss");
});

const opponentAreaMaxWidthStyle = computed(() => {
  const columns = props.player.village.length;
  const effectiveColumns = Math.max(columns, 5);
  const cardMaxSize = 180; // windowWidth.value > 1366 ? 160 : 120;
  const windowAdaptedCardMaxSize = Math.min(cardMaxSize, Math.round((windowHeight.value / 1080) * (windowHeight.value / windowWidth.value * 1920 / 1080) * cardMaxSize));
  const maxWidth = effectiveColumns * windowAdaptedCardMaxSize + (effectiveColumns + 2) * 4 + 32;
  return {
    "max-width": maxWidth + "px"
  };
});

const gridRowsStyle = computed(() => {
  const opponents = props.totalPlayers - 1;
  let minRowLength = 14;
  switch(opponents) {
    case 0: minRowLength = 7; break;
    case 1: minRowLength = 7; break;
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
