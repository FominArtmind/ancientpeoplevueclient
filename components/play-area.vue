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
    <Resources v-if="phase === 'living'" />
    <Draft v-if="phase === 'development'" />
    <Hero />
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
import { nickname, game } from "../composables/state";

let menu = ref<HTMLUListElement>();
let viewMenu = ref(false);
let top = ref("0px");
let left = ref("0px");

const phase = computed(() => {
  return game.value.state.phase;
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

</script>