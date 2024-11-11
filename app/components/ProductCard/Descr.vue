<template>
  <section class="mt-12 p-6 bg-white rounded-2xl">
    <h2 class="font-bold text-slate-600 text-2xl">
      Опис товару <span class="text-slate-900">{{ name }}</span>
    </h2>

    <div class="mt-4 flex flex-col gap-2" v-html="description"></div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  description: String,
});
</script>

<style scoped></style>
