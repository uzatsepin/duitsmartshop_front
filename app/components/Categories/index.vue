<template>
  <div class="mt-12 bg-white">
    <div class="container mx-auto px-2 py-10">
      <h2 class="text-center text-3xl font-bold">Вибір пристроїв розумного будинку</h2>
      <div class="mt-8 flex justify-between gap-2 overflow-scroll">
        <CategoriesItem
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :selected="selectedCategory?.id === Number(category.id)"
          @select="selectCategory({ ...category, id: Number(category.id) })"
        />
      </div>
      <div
        class="mt-10 flex gap-2 lg:gap-6 overflow-scroll"
        v-if="filteredProducts.length >= 1"
      >
        <transition-group name="product-list" tag="div" class="flex gap-2 lg:gap-8">
          <ProductItem
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </transition-group>
      </div>
      <div v-if="filteredProducts.length === 0" class="mt-8 min-h-[506px]">
        <h3 class="mt-6 text-center text-2xl text-slate-500">
          В категорії
          <span class="text-slate-700">
            {{ selectedCategory?.name.toLowerCase() }}
          </span>
          товарів не знайдено
        </h3>
        <div class="mt-6 flex items-center justify-center">
          <NuxtImg src="icons/empty-category.svg" class="max-w-[350px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useCategoryStore } from "~/store/categoriesStore";
import { useProductsStore } from "~/store/productsStore";
import type { IProduct } from "~/store/types/product.types";

const categoriesStore = useCategoryStore();
const productsStore = useProductsStore();

const categories = computed(() => categoriesStore.categories);
const selectedCategory = ref<{ id: number; name: string; slug: string } | null>(null);

const selectCategory = (category: { id: number; name: string; slug: string }) => {
  selectedCategory.value = category;
  productsStore.isLoaded = false;
  productsStore.fetchProductCategory(category.id);
};

const filteredProducts = computed<IProduct[]>(() => {
  return productsStore.productsByCategory;
});

onMounted(() => {
  if (categories.value && categories.value.length > 0) {
    const firstCategory = categories.value[0];
    if (firstCategory && firstCategory.name && firstCategory.slug) {
      selectedCategory.value = {
        ...firstCategory,
        id: Number(firstCategory.id),
      };
    }
    productsStore.fetchProductCategory(Number(firstCategory?.id));
  }
});
</script>

<style scoped>
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.5s ease;
}
.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
