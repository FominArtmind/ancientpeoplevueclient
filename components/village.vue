<template>
  <h1 class="font-larger text-center">Village {{ food }}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> {{ culture }}<span class="icon-fix"><Icon name="bi:fire"/></span> away {{ awayCardsCount }} units - {{ timeSpent }}</h1>
  <div class="min-w-screen flex">
    <CardUnit v-for="card in village" :card="card.card" :rotated="card.rotated"/>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { VillageCard } from "../types/game";
import { DateTime } from "luxon";

const props = defineProps<{ village: VillageCard[], food: number, culture: number, awayCardsCount: number, timeTakenMs: number }>();
const timeSpent = computed(() => {
  return DateTime.fromMillis(props.timeTakenMs).toFormat("m:ss");
});

</script>
