<template>
  <template v-if="!['develop', 'migrationChoice'].includes(event.type) || event.unknownForPlayer">
    <div class="flex flex-wrap items-center m-2">
      <template v-if="event.type === 'hunt'">
        <!-- <ChatValue :value="event.actor" /> -->
        <div class="mx-2"></div>
        <ArtIcon v-for="unit in event.hunters" :type="unit" :resource="false" />
        <ChatValue :value="'hunts'" />
        <ArtIcon v-for="n in event.number" :type="event.resource" :resource="true" />
        <Icon name="bi:arrow-right"/>
        <template v-if="event.food && event.food !== 0">
          <ChatValue :value="event.food" />
          <Icon name="bi:apple"/>
        </template>
        <template v-if="event.culture && event.culture !== 0">
          <ChatValue :value="event.culture" />
          <Icon name="bi:fire"/>
        </template>
      </template>
      <template v-else-if="event.type === 'raid'">
        <!-- <ChatValue :value="event.actor" /> -->
        <div class="mx-2"></div>
        <ArtIcon v-for="unit in event.raiders" :type="unit.type" :resource="false" />
        <ChatValue :value="'raids'" />
        <ChatValue :value="event.aim" />
        <ArtIcon v-for="unit in event.victims" :type="unit.type" :resource="false" />
        <ChatValue :value="`(${event.chances?.winRate}%)`"/>
        <Icon name="bi:arrow-right"/>
        <ChatValue :value="event.success ? 'SUCCESS' : 'FAILURE'" />
        <template v-if="event.foodGain && event.foodGain !== 0">
          <ChatValue :value="event.foodGain" />
          <Icon name="bi:apple"/>
        </template>
        <template v-if="event.cultureGain && event.cultureGain !== 0">
          <ChatValue :value="event.cultureGain" />
          <Icon name="bi:fire"/>
        </template>
      </template>
      <template v-else-if="event.type === 'card'">
        <ChatValue :value="event.actor" />
        <ChatValue :value="'plays'" />
        <ArtIcon :type="event.unit" :resource="false" />
      </template>
      <template v-else-if="event.type === 'pass'">
        <ChatValue :value="event.actor" />
        <ChatValue :value="'passes'" />
      </template>
      <template v-else-if="event.type === 'timePenalty'">
        <ChatValue :value="event.actor" />
        <ChatValue :value="'lost'" />
        <ChatValue :value="event.culture" />
        <Icon name="bi:fire"/>
        <ChatValue :value="'due to time penalty'" />
      </template>
      <template v-else-if="event.type === 'putAsideResources'">
        <ArtIcon v-for="resource in event.resources" :type="resource" :resource="true" />
        <ChatValue :value="'discarded'" />
      </template>
      <template v-else-if="event.type === 'turn'">
        <div class="font-semibold">
          <ChatValue :value="'Turn'" />
          <ChatValue :value="event.turn" />
          <ChatValue :value="event.phase" />
          <ChatValue :value="'phase'" />
        </div>
      </template>
      <template v-else-if="event.type === 'extraFood'">
        <ChatValue :value="'Draft culture level'" />
        <ChatValue :value="event.maxCulture" />
        <ArtIcon v-for="unit in event.discard" :type="unit" :resource="false" />
        <ChatValue :value="'discarded as not meeting the requirements'" />
      </template>
      <template v-else-if="event.type === 'develop'">
        <ChatValue :value="event.actor" />
        <ChatValue :value="'develops'" />
        <ChatValue class="font-semibold" :value="event.card" />
      </template>
      <template v-else-if="event.type === 'end'">
        <div class="font-semibold">
          <ChatValue :value="'Winner is'" />
          <ChatValue :value="event.winner" />
          <ChatValue :value="'! Results:'" />
          <template v-for="(value, key) in event.result">
            <ChatValue :value="key" />
            <ChatValue :value="value" />
            <Icon name="bi:fire"/>
          </template>
        </div>
      </template>
      <template v-else-if="event.type === 'buy'">
        <ChatValue :value="event.actor" />
        <ChatValue :value="'buys'" />
        <ArtIcon :type="event.unit" :resource="false" />
      </template>
      <template v-else-if="event.type === 'upgrade'">
        <ChatValue :value="event.actor" />
        <ChatValue :value="'upgrades'" />
        <ArtIcon :type="event.from" :resource="false" />
        <Icon name="bi:arrow-right"/>
        <ArtIcon :type="event.unit" :resource="false" />
      </template>
      <template v-else-if="event.type === 'pathfindingChoice'">
        <!-- <ChatValue :value="event.actor" /> -->
        <div class="mx-2"></div>
        <ChatValue :value="'adds'" />
        <ArtIcon :type="event.resource" :resource="true" />
        <template v-if="event.from">
          <ChatValue :value="'from'" />
          <ChatValue :value="event.from" />
        </template>
        <ChatValue :value="'to own resources'" />
      </template>
      <template v-else-if="event.type === 'migrationChoice'">
        <!-- <ChatValue :value="event.actor" /> -->
        <div class="mx-2"></div>
        <ChatValue :value="'choses'" />
        <ChatValue :value="event.resource" />
        <ChatValue :value="'and adds to own resources'" />
      </template>
      <template v-else-if="event.type === 'extraCards'">
        <!-- <ChatValue :value="event.actor" /> -->
        <div class="mx-2"></div>
        <ChatValue :value="'adds'" />
        <ChatValue :value="event.number" />
        <ChatValue :value="'extra cards to their hand'" />
      </template>
      <template v-else-if="event.type === 'scent'">
        <!-- <ChatValue :value="event.actor" /> -->
        <div class="mx-2"></div>
        <ChatValue :value="'opens'" />
        <ArtIcon v-for="resource in event.resources" :type="resource" :resource="true" />
        <template v-if="event.resources?.includes(event.resourceType as string)">
          <ChatValue :value="'and adds all'" />
          <ArtIcon :type="event.resourceType" :resource="true" />
          <ChatValue :value="'to own resources'" />
        </template>
      </template>
      <template v-else-if="event.type === 'migration'">
        <!-- <ChatValue :value="event.actor" /> -->
        <div class="mx-2"></div>
        <ChatValue :value="'adds'" />
        <ArtIcon v-for="resource in event.resources" :type="resource" :resource="true" />
        <ChatValue :value="'to own resources'" />
      </template>
      <template v-else-if="event.type === 'community'">
        <!-- <ChatValue :value="event.actor" /> -->
        <div class="mx-2"></div>
        <ChatValue :value="'adds'" />
        <ArtIcon v-for="n in event.number" :type="event.unit" :resource="false" />
        <ChatValue :value="'to their hand'" />
      </template>
      <template v-else-if="event.type === 'chat'">
        <div class="chat-player-message">
          <ChatValue :value="event.actor" />
          <ChatValue :value="':'" />
          <ChatValue class="italic" :value="event.text" />
        </div>
      </template>
      <template v-else>
        <ChatValue :value="'UNKNOWN CHAT EVENT'" />
      </template>
    </div>
    <hr />
  </template>
</template>

<style scoped>
.chat-player-message {
  color: #f3f598
}
</style>

<script setup lang="ts">
import { GeneralEvent } from "../types/events";
import { ref } from 'vue'

const props = defineProps<{ event: GeneralEvent}>();
const selected = ref(false);
</script>