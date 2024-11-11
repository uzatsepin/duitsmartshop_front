<template>
  <div class="mt-12">
    <h2 class="text-2xl font-bold text-slate-800">Популярні товари</h2>

    <carousel :items-to-show="4" class="mt-12" :autoplay="2000" snapAlign="start">
      <slide v-for="product in products" :key="product.id">
        <ProductItem :product="product" />
      </slide>

      <template #addons>
        <navigation class="-ml-10 -mr-10" />
        <pagination class="mt-8" />
      </template>
    </carousel>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/productsStore";

const productsStore = useProductsStore();
await productsStore.fetchAllProducts();

const products = computed(() => productsStore.allProducts);
</script>

<style scoped></style>
