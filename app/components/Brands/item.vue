<template>
  <NuxtLink
    :to="`/brand/${brand.slug}`"
    class="flex flex-col items-center gap-2 min-w-[150px] bg-slate-200 rounded-2xl cursor-pointer py-4 px-6 border hover:bg-white transition-all duration-300"
  >
    <NuxtImg :src="brand.icon" class="w-8 h-8 rounded-2xl" />
    <h3 class="text-slate-600 font-semibold">{{ brand.name }}</h3>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IBrand } from "~/store/types/brand.types";

defineProps<{
  brand: IBrand;
}>();
</script>

<style scoped></style>
