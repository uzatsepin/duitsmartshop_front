<template>
  <div
    class="flex items-center gap-2 bg-slate-200 px-9 py-4 w-fit rounded-2xl cursor-pointer border hover:bg-white transition-all duration-300" :class="{
    'bg-white border border-slate-300': selected }"
       @click="$emit('select')">
    <NuxtImg :src="category.icon" class="w-8 h-8"/>
    <h3 class="font-bold">{{category.name}}</h3>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>

</style>