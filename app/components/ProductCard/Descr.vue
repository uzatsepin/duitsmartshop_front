<template>
  <section class="mt-12 p-6 bg-white rounded-2xl">
    <h2 class="font-bold text-slate-600 text-2xl">
      Опис товару <span class="text-slate-900">{{ name }}</span>
    </h2>

    <div class="mt-4 descr" v-html="description"></div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  description: String,
});
</script>

<style>
.descr h1 {
  @apply text-2xl font-bold text-slate-900 mb-4;
}

.descr h2 {
  @apply text-xl font-bold text-slate-900 mb-3;
}

.descr p {
  @apply text-gray-600 mb-4 leading-relaxed;
}

.descr ul,
.descr ol {
  @apply ml-6 mb-4 list-disc;
}

.descr li {
  @apply mb-2;
}

.descr a {
  @apply text-blue-600 hover:text-blue-800 underline;
}

.descr strong {
  @apply font-bold;
}

.descr em {
  @apply italic;
}

.descr img {
  @apply max-w-full h-auto my-4 rounded;
}
</style>
