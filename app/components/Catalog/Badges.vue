<template>
  <NuxtLink :to="`/catalog/${catalogItem.slug}`"
    class="flex items-center gap-2 py-2 px-6 rounded-2xl w-fit border border-slate-300 bg-slate-200 p-6 group hover:bg-white transition-all duration-300 cursor-pointer" :class="{'bg-white border border-slate-300': active}">
    <NuxtImg :src="catalogItem.icon ? catalogItem.icon : ''" class="w-6 h-6"/>
    <h3 class="text-slate-700 group-hover:text-slate-900">{{catalogItem.name}}</h3>
  </NuxtLink>
</template>

<script setup lang="ts">

defineProps<{
  catalogItem: {
    name: string,
    slug: string,
    icon: string,
  },
  active: boolean
}>();
</script>

<style scoped>

</style>