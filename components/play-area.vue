<template>
  <div class="min-h-screen border-l-2 border-white flex justify-between flex-col" @contextmenu="openMenu">
    <ul id="right-click-menu" tabindex="-1" ref="menu" v-if="viewMenu" class="focus:outline-none cursor-pointer" :style="positionStyle" @blur="closeMenu">
      <li><b>Hunt</b></li>
      <li>Pass</li>
    </ul>
    <div v-if="opponents.length === 0" class="empty-opponents">
    </div>
    <div v-if="opponents.length > 0" class="flex">
      <Opponent v-for="opponent in opponents" :player="opponent" />
    </div>
    <Resources v-if="phase === 'living'" @cardClicked="processResourceCardClicked" />
    <Draft v-if="phase === 'development'" @cardClicked="processDraftCardClicked" />
    <Hero @cardClicked="processHeroCardClicked" />
  </div>
</template>

<style scoped>
#right-click-menu {
  background: #7dafbb;
  border: 1px solid #BDBDBD;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 250px;
  z-index: 999999;
}

#right-click-menu li {
  border-bottom: 1px solid #E0E0E0;
  margin: 0;
  padding: 5px 35px;
}

#right-click-menu li:last-child {
  border-bottom: none;
}

#right-click-menu li:hover {
  background: #1E88E5;
  color: #FAFAFA;
}

.empty-opponents {
  min-height: 120px;
}
.village {
  display: inline-block;
  min-height: 240px;
}
.hand {
  display: inline-block;
  min-height: 240px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card, VillageCard, Player } from "../types/game";
import { nickname, game, selection } from "../composables/state";
import { clone } from "../utils/clone";

let menu = ref<HTMLUListElement>();
let viewMenu = ref(false);
let top = ref("0px");
let left = ref("0px");

const phase = computed(() => {
  return game.value.state.phase;
});

const hero = computed(() => {
  return game.value.state.players.find(value => value.nick === nickname.value) as Player;
});

const opponents = computed(() => {
  const playersN = game.value.players.length;
  if(playersN < 2) {
    return [];
  }
  const heroIndex = game.value.state.players.findIndex(value => value.nick === nickname.value);

  const opps = [];
  for(let n = 0; n < playersN - 1; n++) {
    opps.push(game.value.state.players[(heroIndex + 1 + n) % playersN]);
  }
  return opps;
});

const heroTurn = computed(() => {
  return game.value.state.players[game.value.state.actor].nick === nickname.value;
});

const positionStyle = computed(() => ({
  top: top.value,
  left: left.value
}));

function setMenu(top_: number, left_: number) {
  const largestHeight = window.innerHeight - (menu.value?.offsetHeight || 0) - 25;
  const largestWidth = window.innerWidth - (menu.value?.offsetWidth || 0) - 25;

  if(top_ > largestHeight) {
    top_ = largestHeight;
  }
  if(left_ > largestWidth) {
    left_ = largestWidth;
  }

  top.value = top_ + "px";
  left.value = left_ + "px";
}

function openMenu(e: MouseEvent) {
  viewMenu.value = true;

  nextTick(function() {
    (menu.value as HTMLUListElement).focus();

    setMenu(e.y, e.x)
  });
  e.preventDefault();
}

function closeMenu() {
  viewMenu.value = false;
}

function processHeroCardClicked(card: Card | VillageCard, location: "village" | "hand") {
  if(heroTurn.value && !hero.value.state.pathfindingChoose) {
    if(hero.value.state.sociality) {
      if(location === "hand") {
        const hcard = card as Card;
        const index = selection.value.hand.findIndex(value => value.id === hcard.id);
        if(index === -1) {
          selection.value.hand.push(clone(hcard));
        }
        else {
          selection.value.hand.splice(index, 1);
        }
      }
    }
    else {
      if(location === "hand") {
        const hcard = card as Card;
        if(hero.value.state.playingCard) {
          console.log("hero plays", hcard.type);
        }
        else {
          // check for leadership, unity hero.value.state.leadership
          console.log("hero plays leadership/unity or wrong card", hcard.type);
        }
      }
      else if(location === "village") {
        const vcard = card as VillageCard;
        const index = selection.value.village.findIndex(value => value.card.id === vcard.card.id);
        if(phase.value === "living") {
          if(index === -1) {
            selection.value.village.push(clone(vcard));
          }
          else {
            selection.value.village.splice(index, 1);
          }
        }
        else {
          if(index === -1) {
            selection.value.village = [clone(vcard)];
          }
          else {
            selection.value.village = [];
          }
        }
      }
    }
  }
}

function processResourceCardClicked(card: Card, player?: string) {
  if(heroTurn.value && !hero.value.state.pathfindingChoose && !hero.value.state.sociality) {
    if(!player || player === nickname.value) {
      const index = selection.value.resources.findIndex(value => value.id === card.id);
      if(index === -1) {
        selection.value.resources.push(clone(card));
      }
      else {
        selection.value.resources.splice(index, 1);
      }
    }
  }
}

function processDraftCardClicked(card: Card, development: boolean) {
  if(heroTurn.value) {
    if(development) {
      selection.value.draft = undefined;
      if(selection.value.development?.type === card.type) {
        selection.value.development = undefined;
      }
      else {
        selection.value.development = clone(card);
      }
    }
    else {
      selection.value.development = undefined;
      if(selection.value.draft?.type === card.type) {
        selection.value.draft = undefined;
      }
      else {
        selection.value.draft = clone(card);
      }
    }
  }
}

function play() {

}

function selectSocialityCardsToReturn() {

}

function selectPathfindingCard() {

}

function hunt() {

}

function raid(opponent: string) {

}

function pass() {

}

function buy() {

}

function upgrade() {

}

function develop() {

}

</script>