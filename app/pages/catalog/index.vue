<template>
  <Header />
  <NuxtLayout name="default">
    <div class="mt-6">
      <h1 class="text-2xl font-bold text-slate-900">Каталог товарів</h1>
      <CatalogCategories :catalogItems="catalogItems" />
    </div>
  </NuxtLayout>

  <Footer />
</template>

<script setup lang="ts">
import { useCategoryStore } from "~/store/categoriesStore";

export interface ICatalogItems {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

const categoriesStore = useCategoryStore();

const catalogItems = computed(() => categoriesStore.categories);

</script>

<style scoped></style>