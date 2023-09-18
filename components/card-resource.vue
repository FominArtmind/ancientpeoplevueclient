<template>
  <CardBody>
    <div class="w-full image-container bg-contain bg-no-repeat" :style="{ 'background-image': 'url(/gamedata/resources/views/' + card.type + '-white.png)' }"></div>
    <div class="mx-auto">
      <div v-if="resource?.hunting"><Icon v-for="n in resource?.peopleCost" name="teenyicons:arrow-up-outline"/></div>
      <div v-if="!resource?.hunting"><Icon name="ph:person-simple-fill"/></div>
      <div class="flex justify-center"><div>{{ resource?.food }}</div> <div class="apple-icon-fix"><Icon name="bi:apple"/></div></div>
    </div>
  </CardBody>
</template>

<style scoped>
.image-container {
  aspect-ratio: 5/4;
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

const props = defineProps<{ card: Card }>();

const { data } = await useAsyncData("resources", () => queryContent("gamedata", "resources", "cards").find());
const resources: Resource[] = (data as any)._rawValue;

const resource = ref(resources.find(value => value.title.toLowerCase() === props.card.type));
</script>