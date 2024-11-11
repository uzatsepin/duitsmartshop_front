<!-- pages/admin/products/index.vue -->
<template>
  <div>
    <Preloader v-if="loading" />
    <div v-else class="overflow-x-auto">
      <table
        class="min-w-full bg-white shadow-md rounded-lg border border-slate-200 border-collapse"
      >
        <thead class="bg-slate-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
            >
              Зображення
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
            >
              Назва
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
            >
              Ціна
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
            >
              Знижка
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap"
            >
              На складі
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
            >
              Переглядів
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
            >
              Дії
            </th>
          </tr>
        </thead>
        <tbody>
          <AdminProductItem
            v-for="product in productsStore.allProducts"
            :key="product.id"
            :product="product"
            @update-products="productsStore.fetchAllProducts"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/productsStore";

const productsStore = useProductsStore();
const loading = ref(true);

onMounted(async () => {
  await productsStore.fetchAllProducts();
  loading.value = false;
});
</script>
