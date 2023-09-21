<template>
  <h1 class="font-larger text-center">Resources (deck size: {{ deckSize }})</h1>
  <div class="min-w-screen flex">
    <CardResource v-for="card in resources" :card="card"/>
    <template v-for="player in players">
      <CardResource v-for="card in player.resources" :card="card" :player="player.nick"/>
    </template>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/game";

const props = defineProps<{ resources: Card[], deckSize: number, players: { nick: string, resources: Card[] }[] }>();

</script>