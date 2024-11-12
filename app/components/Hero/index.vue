<template>
  <carousel :items-to-show="1" class="mt-6">
    <slide v-for="slide in banners" :key="slide.id">
      <div
        class="max-h-[500px] w-full bg-slate-400 flex items-center justify-center rounded-2xl overflow-hidden"
      >
        <NuxtImg
          :src="slide.imageUrl"
          class="w-full h-full object-contain rounded-2xl overflow-hidden"
        />
      </div>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script setup lang="ts">
interface IBanner {
  id: number;
  imageUrl: string;
  name: string;
  slug: string;
}

const banners = ref([] as IBanner[]);

async function fetchBanners() {
  const config = useRuntimeConfig();
  const data = await $fetch<[]>(`${config.public.apiBase}/banners`);
  if (data) {
    banners.value = data;
  }
}

fetchBanners();
</script>

<style scoped></style>
