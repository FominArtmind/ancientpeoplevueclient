<template>
  <CardBody :selected="selected">
    <h3 v-if="player" class="player-nick">{{ player }}</h3>
    <div class="w-full image-container bg-contain bg-no-repeat" data-te-toggle="tooltip" v-bind:title="resource?.title" :style="{ 'background-image': 'url(./gamedata/resources/views/' + card.type + '-white.png)' }"></div>
    <div class="font-larger line-height-fix">
      <div>
        <Info v-if="resource?.hunting" :tooltip="'Requires ' + resource?.peopleCost + ' hunting in total to get'">
          <Icon v-for="n in resource?.peopleCost" name="teenyicons:arrow-up-outline"/>
        </Info>
        <Info v-if="!resource?.hunting" :tooltip="'Requires 1 person to get'">
          <Icon name="ph:person-simple-fill"/>
        </Info>
      </div>
      <Info class="info-padding" :tooltip="resource?.title + ' provides you with ' + resource?.food + ' food when ' + (resource?.hunting ? 'hunted' : 'fished')">
        <span>{{ resource?.food }}</span>
        <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span>
      </Info>
    </div>
  </CardBody>
</template>

<style scoped>
.player-nick {
  margin-bottom: -10%;
  margin-top: 5%;
}
.image-container {
  aspect-ratio: 5/4;
  margin-bottom: 0%;
  margin-top: 10%;
  width: 100%;
}

.line-height-fix {
  line-height: 140%;
}

.info-padding {
  margin-top: 5%;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/game";
import { resourceCard } from "../composables/content";

const props = defineProps<{ card: Card, player?: string }>();

const resource = ref(await resourceCard(props.card.type));

const selected = computed(() => {
  return selection.value.resources.some(value => value.id === props.card.id);
});

</script>