<template>
  <div class="p-4 rounded-2xl bg-white">
    <NuxtImg src="https://placehold.co/230x230" class="w-full max-h-[230px] object-cover rounded-2xl"/>
    <div class="mt-2 flex justify-between">
      <NuxtLink to="/" class="text-sm text-slate-500 hover:text-slate-700 cursor-pointer hover:underline">Andrii</NuxtLink>
      <p class="text-sm text-slate-500">10.10.2024</p>
    </div>
    <NuxtLink to="/">
      <h2 class="mt-2 text-lg font-bold text-slate-900 hover:underline cursor-pointer">Name of Article</h2>
    </NuxtLink>
    <p class="mt-2 text-slate-600 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

    <div class="mt-2 pt-2 border-t border-slate-200">
      <div class="flex justify-between">
        <div class="flex gap-2 items-center group cursor-pointer">
          <Icon name="mdi:eye-outline" class="w-5 h-5 text-slate-500 group-hover:text-slate-700 transition-colors duration-300" />
          <span class="text-sm text-slate-500 group-hover:text-slate-700 transition-colors duration-300">23</span>
        </div>
        <div class="flex gap-2 items-center group cursor-pointer">
          <Icon name="mdi:like" class="w-5 h-5 text-slate-500 group-hover:text-slate-700 transition-colors duration-300" />
          <span class="text-sm text-slate-500 group-hover:text-slate-700 transition-colors duration-300">13</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>