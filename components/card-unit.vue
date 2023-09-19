<template>
  <CardBody>
    <div class="">
      <Info class="unit-cost" :tooltip="`${unit?.title} costs ${unit?.foodCost} food on draft`">
        <div class="food-cost">{{unit?.foodCost}}</div>
      </Info>
      <div class="unit-title">{{ unit?.title }}</div>
      <Info v-if="unit?.cultureLevel" class="unit-culture-level" :tooltip="`${unit?.title} requires at least one player having culture level of ${unit?.cultureLevel} or higher to appear on draft, you must have culture level of ${unit?.cultureLevel} or higher to be able to buy/upgrade to this card`">
        {{unit?.cultureLevel}}<span class="icon-fix"><Icon name="bi:fire"/></span>
      </Info>
    </div>
    <div class="w-full image-container bg-contain bg-no-repeat" :style="{ 'background-image': 'url(/gamedata/units/views/' + card.type + '-icon-white.png)' }"></div>
    <div class="mx-auto">
      <template v-if="unit?.hunting"><Info :tooltip="`${unit?.title} has hunting ${unit?.hunting} (needed for deer, aurochs, mammoth)`"><Icon v-for="n in unit?.hunting" name="teenyicons:arrow-up-outline"/></Info></template>
      <template v-if="unit?.attack"><Info :tooltip="`${unit?.title} has attack ${unit?.attack} (needed in raids, increases raid attack dice throw by ${unit?.attack})`"><Icon v-for="n in unit?.attack" name="mdi:axe"/></Info></template>
      <template v-if="unit?.cultureExchange"><Info :tooltip="`${unit?.title} has culture exchange ${unit?.cultureExchange} (needed in raids, increases raid difference for determining culture gain by ${unit?.cultureExchange})`"><Icon v-for="n in unit?.cultureExchange" name="mdi:torch"/></Info></template>
      <template v-if="unit?.defense"><Info :tooltip="`${unit?.title} has defense ${unit?.defense} (needed in raids defending, increases raid defense dice throw by ${unit?.defense})`"><Icon v-for="n in unit?.defense" name="ic:round-shield"/></Info></template>
      <template v-if="unit?.raidFoodSteal"><Info :tooltip="`${unit?.title} has raid food steal ${unit?.hunting}`"><Icon name="uil:corner-up-right-alt"/>{{ unit?.raidFoodSteal }}</Info></template>
    </div>
 <!--properties?: {
    leadership?: number
    sociality?: number
    extraCards?: number
    community?: number
    unity?: boolean
    migration?: number
    resourceBonus?: {
      fish?: number
      deer?: number
      aurochs?: number
      mammoth?: number
    },
    scent?: {
      fish?: number
      deer?: number
      aurochs?: number
      mammoth?: number
    },
    sneak?: number
    mentoring?: number
    cultureLevelIncrease?: number
    hideaway?: number
    reflection?: boolean
    pathfinding?: boolean
    valor?: number
    cultureResistance?: boolean
    cultureRaid?: boolean
  }
  villageAction?: {
    food?: number
    culture?: number
    sacrifice?: boolean
  }
  cultureValue: number
  unique?: boolean --> 
    <Info v-if="unit?.cultureValue" class="unit-culture-value" :tooltip="`${unit?.title} can provide up to ${unit?.cultureValue} culture when defeated in raid`">
      <span class="icon-fix"><Icon name="ic:outline-local-fire-department"/></span><span>{{unit?.cultureValue}}</span>
    </Info>
  </CardBody>
</template>

<style scoped>
.image-container {
  aspect-ratio: 5/4;
  margin-bottom: -10%;
  margin-top: 2.5%;
  width: 100%;
}

.food-cost {
  font-weight: 500;
  padding-left: 25%;
  padding-right: 25%;
}

.icon-fix {
  font-size: smaller;
  vertical-align: top;
}

.unit-cost {
  position: absolute;
  left: 5%;
  top: 2.5%;
}

.unit-title {
  margin-left: auto;
  margin-right: auto;
}

.unit-culture-level {
  position: absolute;
  right: 5%;
  top: 2.5%;
}

.unit-culture-value {
  position: absolute;
  right: 5%;
  bottom: 2.5%;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/game";
import { Unit } from "../types/unit";

const props = defineProps<{ card: Card }>();

const { data } = await useAsyncData("units", () => queryContent("gamedata", "units", "cards").find());
const units: Unit[] = (data as any)._rawValue;

const unit = ref(units.find(value => value.title.toLowerCase().replaceAll(" ", "-") === props.card.type));
// console.log(unit.value);
</script>