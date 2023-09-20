<template>
  <div class="min-h-screen border-l-2 border-white" @contextmenu="openMenu">
    <ul id="right-click-menu" tabindex="-1" ref="menu" v-if="viewMenu" class="focus:outline-none cursor-pointer" :style="positionStyle" @blur="closeMenu">
      <li><b>Hunt</b></li>
      <li>Pass</li>
    </ul>
    <div class="flex">
      <CardResource v-for="card in resourceCards" :card="card"/>
    </div>
    <div class="flex">
      <CardUnit v-for="card in unitCards" :card="card"/>
    </div>
    <div class="flex">
      <CardUnit v-for="card in unitCards2" :card="card"/>
    </div>
    <div class="flex">
      <CardUnit v-for="card in unitCards3" :card="card"/>
    </div>
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
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/game";

let menu = ref<HTMLUListElement>();
let viewMenu = ref(false);
let top = ref("0px");
let left = ref("0px");

const resourceCards = ref<Card[]>([
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'deer'},
  { id: 0, type: 'aurochs'},
  { id: 0, type: 'mammoth'}
]);
const resourceCards2 = ref<Card[]>([
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'deer'},
  { id: 0, type: 'aurochs'},
  { id: 0, type: 'mammoth'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'fish'},
  { id: 0, type: 'deer'},
  { id: 0, type: 'aurochs'},
  { id: 0, type: 'mammoth'}
]);
const unitCards = ref<Card[]>([
  { id: 0, type: 'inhabitant'},
  { id: 0, type: 'fire-keeper'},
  { id: 0, type: 'leader'},
  { id: 0, type: 'collector'},
  { id: 0, type: 'fisher'},
  { id: 0, type: 'agile'},
  { id: 0, type: 'caveman'}
]);
const unitCards2 = ref<Card[]>([
  { id: 0, type: 'mentor'},
  { id: 0, type: 'cannibal'},
  { id: 0, type: 'patrol'},
  { id: 0, type: 'chiropractor'},
  { id: 0, type: 'handyman'},
  { id: 0, type: 'bear-son'},
  { id: 0, type: 'chieftain'}
]);
const unitCards3 = ref<Card[]>([
  { id: 0, type: 'watchdog'},
  { id: 0, type: 'engraver'},
  { id: 0, type: 'pathfinder'},
  { id: 0, type: 'warrior'},
  { id: 0, type: 'amazon'},
  { id: 0, type: 'ancient'},
  { id: 0, type: 'settler'},
  { id: 0, type: 'wet-nurse'},
  { id: 0, type: 'beater'},
  { id: 0, type: 'shaman'},
  { id: 0, type: 'hunter'}
]);

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