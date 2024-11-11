<template>
  <div class="mt-6 grid grid-cols-4 gap-8 cursor-pointer">
    <NuxtLink
      :to="`/catalog/${item.slug}`"
      class="flex flex-col items-center gap-4 rounded-2xl border border-slate-300 bg-slate-50 p-6 group hover:bg-white transition-all duration-300"
      v-for="item in catalogItems"
      :key="item.id"
    >
      <div>
        <NuxtImg :src="item.icon" class="h-12 w-12 group-hover:scale-110 transition-all duration-300" />
      </div>
      <h2 class="text-lg font-bold text-slate-600 group-hover:text-slate-900">
        {{ item.name }}
      </h2>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { ICatalogItems } from "~/pages/catalog/index.vue";

defineProps<{
  catalogItems: ICatalogItems[];
}>();
</script>

<style scoped>

</style>