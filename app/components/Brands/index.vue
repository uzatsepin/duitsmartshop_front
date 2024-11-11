<template>
  <section class="mt-8">
    <h2 class="text-2xl font-semibold text-slate-800">Бренди з якими ми співпрацюємо</h2>
    <div class="mt-6 flex items-center gap-4 overflow-x-scroll no-scrollbar">
      <BrandsItem v-for="brand in brands" :key="brand.id" :brand="brand" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useBrandsStore } from "~/store/brandsStore";

const brandsStore = useBrandsStore();

await brandsStore.fetchBrands();

const brands = computed(() => brandsStore.brands);
</script>

<style scoped></style>
