<template>
  <section class="mt-12">
    <div class="flex justify-between">
      <h2 class="font-bold text-slate-900 text-xl">
        Наш блог допоможе у виборі
      </h2>
      <NuxtLink to="/blog" class="flex items-center gap-2 group cursor-pointer">
        <span class="text-slate-600 group-hover:text-slate-900 transition-all duration-300">Перейти у блог</span>
        <Icon name="iconamoon:arrow-right-2" class="w-6 h-6 text-slate-600 group-hover:text-slate-900 group-hover:scale-110 transition-all duration-300"/>
      </NuxtLink>
    </div>
    <div class="flex gap-6 overflow-x-scroll no-scrollbar py-8">
      <BlogItem class="min-w-[300px]" v-for="i in 10" :key="i"/>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>