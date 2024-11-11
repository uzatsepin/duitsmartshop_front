<template>
  <div class="mt-4">
    <h3 class="text-lg font-bold">Технології, які підтримує пристрій</h3>
    <div class="p-4 bg-white mt-2 rounded-2xl flex gap-2">
      <div
        class="p-4 border border-slate-200 rounded-2xl flex flex-col items-center gap-2 relative cursor-pointer w-[157px] group hover:bg-slate-100 transition-all duration-300"
        v-for="item in
            technologies" :key="item.name">
        <NuxtImg :src="item.icon" class="w-12 h-12"/>
        <p class="font-bold text-md text-center">{{item.name}}</p>
        <Icon name="material-symbols:info-outline" class="w-4 h-4 absolute right-2 top-2 text-slate-400 group-hover:text-slate-700" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps({
  technologies: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>

</style>