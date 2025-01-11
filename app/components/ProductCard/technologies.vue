<template>
  <div class="mt-4">
    <h3 class="text-lg font-bold">Технології, які підтримує пристрій</h3>
    <div class="mt-2 flex gap-2 rounded-2xl bg-white p-4 overflow-scroll">
      <div
        class="group relative flex w-[157px] min-w-[157px] cursor-pointer flex-col items-center gap-2 rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:bg-slate-100"
        v-for="item in technologies"
        :key="item?.name"
      >
        <NuxtImg
          :src="item.icon"
          class="h-12 w-12"
          :alt="item.name"
          :title="item.name"
        />
        <p class="text-md text-center font-bold">{{ item.name }}</p>
        <Icon
          name="material-symbols:info-outline"
          class="absolute right-2 top-2 h-4 w-4 text-slate-400 group-hover:text-slate-700"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  technologies: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
