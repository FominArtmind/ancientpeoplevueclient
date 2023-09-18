<template>
  <CardBody>
    <div class="w-full image-container bg-contain bg-no-repeat" data-te-toggle="tooltip" v-bind:title="resource?.title" :style="{ 'background-image': 'url(/gamedata/resources/views/' + card.type + '-white.png)' }"></div>
    <div>
      <div v-if="resource?.hunting" class="mx-auto w-min" data-te-toggle="tooltip" v-bind:title="'Requires ' + resource?.peopleCost + ' hunting in total to get'"><div class="flex"><Icon v-for="n in resource?.peopleCost" name="teenyicons:arrow-up-outline"/></div></div>
      <div v-if="!resource?.hunting" class="mx-auto w-min" data-te-toggle="tooltip" v-bind:title="'Requires 1 person to get'"><Icon name="ph:person-simple-fill"/></div>
      <div class="flex justify-center mx-auto w-min" data-te-toggle="tooltip" v-bind:title="resource?.title + ' provides you with ' + resource?.food + ' food when ' + (resource?.hunting ? 'hunted' : 'fished')">
        <div>{{ resource?.food }}</div>
        <div class="apple-icon-fix"><Icon name="bi:apple"/></div>
      </div>
    </div>
  </CardBody>
</template>

<style scoped>
.image-container {
  aspect-ratio: 5/4;
  margin-bottom: 10%;
  margin-top: 20%;
  width: 100%;
}

.apple-icon-fix {
  line-height: 0.3rem;
}
@container (min-width: 40px) {
  .apple-icon-fix {
    line-height: 0.6rem !important;
    padding-left: 0.05rem;
  }
}
@container (min-width: 80px) {
  .apple-icon-fix {
    line-height: 0.8rem !important;
    padding-left: 0.1rem;
  }
}
@container (min-width: 120px) {
  .apple-icon-fix {
    line-height: 1.1rem !important;
    padding-left: 0.1rem;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/game";
import { Resource } from "../types/resource";
import { onMounted } from 'vue'
// @ts-ignore
import { Tooltip, initTE } from "tw-elements";

onMounted(() => {
  initTE({ Tooltip });
});

const props = defineProps<{ card: Card }>();

const { data } = await useAsyncData("resources", () => queryContent("gamedata", "resources", "cards").find());
const resources: Resource[] = (data as any)._rawValue;

const resource = ref(resources.find(value => value.title.toLowerCase() === props.card.type));
</script>