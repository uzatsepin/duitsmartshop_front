<template>
  <div class="mt-4">
    <h3 class="text-lg font-bold">Короткий опис</h3>
    <div class="mt-2 p-4 rounded-2xl bg-white">
      <ul class="pl-6 flex flex-col gap-2">
        <li
          class="text-md text-slate-600 list-disc"
          v-for="item in descrItems"
          :key="item.name"
        >
          {{ item.name }} <span class="font-bold text-slate-800">{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  descrItems: { name: string; value: string }[];
}>();
</script>

<style scoped></style>
