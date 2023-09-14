<template>
  <div class="flex w-screen h-screen bg-image bg-cover">
    <div class="w-1/5 h-screen overflow-hidden">
      <StateArea class="h-40" />
      <ChatArea class="h-[calc(100%-240px)]" />
      <ChatSendBox class="h-20" />
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
