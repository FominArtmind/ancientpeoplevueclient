<template>
  <div class="scrollable-div overflow-y-auto font-light">
    <div class="scrollable-div-inside">
      <ChatItem v-for="event in events" :event="event"/>
    </div>
  </div>
</template>

<style scoped>
.scrollable-div {
  direction: rtl;
}
.scrollable-div-inside {
  direction: ltr;
}
.scrollable-div::-webkit-scrollbar {
  width: 4px; /* Set the width of the scrollbar */
  position: absolute;
  right: 0; /* Position the scrollbar on the right of the element*/
}
::-webkit-scrollbar-track {
  background: #ffffff;
}
.scrollable-div::-webkit-scrollbar-thumb {
  background: #9ebdc5;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #7b9da5;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

// const props = defineProps({
//   // item: ChatItem
// });
const events = ref([
  {
    type: "turn",
    turn: 4,
    phase: "living"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "leader"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "fisher"
  },
  {
    type: "scent",
    actor: "Arseniy",
    resources: ["fish"],
    resourceType: "fish"
  },
  {
    type: "hunt",
    actor: "Arseniy",
    hunters: ["leader", "fisher"],
    resource: "fish",
    number: 1,
    food: 6,
    culture: 0 
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "watchdog"
  },
  {
    type: "extraCards",
    actor: "Kuzma",
    number: 1
  },
  {
    type: "pass",
    actor: "Kuzma"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "hunter"
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "amazon"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "patrol"
  },
  {
    type: "migration",
    actor: "Kuzma",
    resources: ["deer"]
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "caveman"
  },
  {
    type: "community",
    actor: "Kuzma",
    unit: "caveman",
    number: 2
  },
  {
    type: "chat",
    actor: "Kuzma",
    text: "K-k-k-kaveman"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "caveman"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "caveman"
  },
  {
    type: "hunt",
    actor: "Kuzma",
    hunters: ["amazon", "patrol", "caveman", "caveman", "caveman"],
    resource: "mammoth",
    number: 1,
    food: 15,
    culture: 0 
  },
  {
    type: "chat",
    actor: "Arseniy",
    text: "Nice, gg wp"
  },
  {
    type: "pass",
    actor: "Kuzma"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "pathfinder"
  },
  {
    type: "pathfindingChoice",
    actor: "Arseniy",
    resource: "deer",
    from: "Kuzma"
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "collector"
  },
  {
    type: "pass",
    actor: "Kuzma"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "warrior"
  },
  {
    type: "hunt",
    actor: "Arseniy",
    hunters: ["hunter"],
    resource: "deer",
    number: 1,
    food: 6,
    culture: 0 
  },
  {
    type: "raid",
    actor: "Arseniy",
    aim: "Kuzma",
    chances: {
      winRate: 38.7,
      loseRate: 61.3,
      testWins: 3879,
      testLosses: 6121
    },
    raiders: [
      { type: "pathfinder", impact: 1 },
      { type: "warrior", impact: 3 }
    ],
    victims: [
      { type: "watchdog", impact: 2 },
      { type: "ancient", impact: 1 }
    ],
    success: true,
    foodGain: 8,
    foodLost: 8,
    cultureGain: 3,
    cultureLost: 0 
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "ancient"
  },
  {
    type: "pass",
    actor: "Kuzma"
  },
  {
    type: "turn",
    turn: 4,
    phase: "development"
  },
  {
    type: "develop",
    actor: "Arseniy",
    card: "rock-painting",
    unknownForPlayer: true
  },
  {
    type: "upgrade",
    actor: "Kuzma",
    unit: "settler",
    from: "caveman" 
  },
  {
    type: "buy",
    actor: "Arseniy",
    unit: "chiropractor"
  },
  {
    type: "upgrade",
    actor: "Kuzma",
    unit: "engraver",
    from: "caveman" 
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "pass",
    actor: "Kuzma"
  }
]);
const selected = ref(false);
</script>