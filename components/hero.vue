<template>
  <div class="hero-area" :style="heroAreaMaxWidthStyle">
    <h1 class="font-larger text-center">Village {{ food }}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> {{ culture }}<span class="icon-fix"><Icon name="bi:fire"/></span>, away {{ awayCardsCount }} units, deck size: {{ deckSize }} - {{ timeSpent }}</h1>
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
  min-height: 240px;
  position: absolute;
  bottom: 0;
  width: calc(80% - 2px);
}
.card-grid {
  width: 100%;
  display: grid;
  grid-column-gap: 0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.adaptive-text-container {
  container-type: inline-size;
}

.adaptive-text {
  font-size: 0.425rem;
  line-height: 100%;
  text-align: center;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
}
@container (min-width: 55px) {
  .adaptive-text {
    font-size: 0.5rem !important;
    line-height: 100%;
  }
}
@container (min-width: 70px) {
  .adaptive-text {
    font-size: 0.6rem !important;
    line-height: 110%;
  }
}
@container (min-width: 85px) {
  .adaptive-text {
    font-size: 0.65rem !important;
    line-height: 110%;
  }
}
@container (min-width: 95px) {
  .adaptive-text {
    font-size: 0.7rem !important;
    line-height: 110%;
  }
}
@container (min-width: 105px) {
  .adaptive-text {
    font-size: 0.775rem !important;
    line-height: 120%;
  }
}
@container (min-width: 115px) {
  .adaptive-text {
    font-size: 0.85rem !important;
    line-height: 120%;
  }
}
@container (min-width: 130px) {
  .adaptive-text {
    font-size: 0.925rem !important;
    line-height: 120%;
  }
}
@container (min-width: 140px) {
  .adaptive-text {
    font-size: 1rem !important;
    line-height: 120%;
  }
}
@container (min-width: 150px) {
  .adaptive-text {
    font-size: 1.2rem !important;
    line-height: 120%;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, VillageCard } from "../types/game";
import { DateTime } from "luxon";

const props = defineProps<{ hand: Card[], deckSize: number, village: VillageCard[], food: number, culture: number, awayCardsCount: number, timeTakenMs: number }>();
const timeSpent = computed(() => {
  return DateTime.fromMillis(props.timeTakenMs).toFormat("m:ss");
});

const heroAreaMaxWidthStyle = computed(() => {
  const columns = props.village.length + props.hand.length;
  const maxWidth = Math.max(columns, 5) * 160 + 64;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => ({
  "grid-template-columns": Array(props.village.length).fill('1fr').join(" ") + " 4rem " + Array(props.hand.length).fill('1fr').join(" ")
}));

</script>
