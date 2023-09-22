<template>
  <h1 class="font-larger text-center">Hand (deck size: {{ deckSize }})</h1>
  <div class="min-w-screen flex">
    <CardUnit v-for="card in hand" :card="card"/>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/game";

const props = defineProps<{ hand: Card[], deckSize: number }>();

</script>