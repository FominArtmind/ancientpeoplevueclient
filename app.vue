<template>
  <Link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap" rel="stylesheet" />
  <div class="flex w-screen h-screen bg-image bg-cover select-none">
    <div class="w-1/5 h-screen overflow-hidden">
      <StateArea class="h-28" :game="game" />
      <ChatArea class="h-[calc(100%-160px)]" />
      <ChatSendBox class="h-12" />
    </div>
    <div class="w-4/5">
      <PlayArea />
    </div>
  </div> 
</template>

<style scoped>
.bg-image {
  background-image: url("./assets/intro-bg.png");
}
</style>

<script setup lang="ts">
import "tw-elements/dist/css/tw-elements.min.css";
import { onMounted, provide } from "vue";
// @ts-ignore
import { Tooltip, initTE } from "tw-elements";
import { ref } from "vue";
import { Game } from "./types/game";

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
}
onMounted(() => {
  initTE({ Tooltip });
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
provide("windowWidth", windowWidth);
provide("windowHeight", windowHeight);

const game = ref<Game>({
  id: "id",
  version: "192",
  maxPlayers: 2,
  options: [
    {
      name: "version",
      value: "192"
    },
    {
      name: "victoryCulture",
      value: "50"
    }
  ],
  creator: "Arseniy",
  players: ["Arseniy", "Kuzma"],
  started: true,
  finished: false,
  state: {
    turn: 5,
    phase: "living",
    actor: 0,
    players: [
      {
        nick: "Arseniy",
        culture: 10,
        food: 1,
        village: [
          {
            card: { id: 0, type: "patrol" },
            rotated: false
          },
          {
            card: { id: 1, type: "hunter" },
            rotated: false
          },
          {
            card: { id: 2, type: "cannibal" },
            rotated: false
          }
        ],
        deckSize: 2,
        handSize: 1,
        awayCardsCount: 0,
        awayFood: 0,
        awayCulture: 0,
        awayResources: [
          {
            "id": 206,
            "type": "deer"
          }
        ],
        state: {
          playingCard: false,
          passed: true,
          leadership: [],
          unity: "",
          migrationChoose: [],
          pathfindingChoose: false,
          sociality: 0
        },
        timeTakenMs: 572023
      },
      {
        nick: "Kuzma",
        culture: 6,
        food: 3,
        village: [
          {
            card: { id: 10, type: "caveman" },
            rotated: false
          },
          {
            card: { id: 11, type: "caveman" },
            rotated: false
          },
          {
            card: { id: 12, type: "caveman" },
            rotated: false
          },
          {
            card: { id: 13, type: "caveman" },
            rotated: false
          },
          {
            card: { id: 14, type: "chiropractor" },
            rotated: false
          }
        ],
        deckSize: 0,
        handSize: 3,
        awayCardsCount: 0,
        awayFood: 0,
        awayCulture: 0,
        awayResources: [
        ],
        state: {
          playingCard: true,
          passed: true,
          leadership: [],
          unity: "",
          migrationChoose: [],
          pathfindingChoose: false,
          sociality: 0
        },
        timeTakenMs: 424068
      }
    ],
    resourcesDeckSize: 12,
    openedResources: [
      {
        id: 200,
        type: "fish"
      },
      {
        id: 201,
        type: "fish"
      },
      {
        id: 202,
        type: "deer"
      },
      {
        id: 203,
        type: "deer"
      },
      {
        id: 204,
        type: "aurochs"
      },
      {
        id: 205,
        type: "mammoth"
      }
    ],
    developmentCards: [],
    draftDeckSize: 75,
    draftCards: [],
    extraFood: 0
    // raidAwaiting?: Action
  },
  inventions: [
    "bolas", "paints", "foodPit", "flint", "fishingHook",
    "microlits", "dwelling", "bow", "handle", "basket",
    "needle", "javelin", "atlatl", "dog", "totem"
  ],
  startTime: 1694757349000,
  lastPlayerActionTime: 1694763459000
});
</script>