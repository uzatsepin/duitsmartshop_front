<template>
  <div
    @click="toggleSearch"
    class="text-slate-600 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all duration-300 relative cursor-pointer"
  >
    <Icon name="material-symbols:search" class="w-6 h-6" />
  </div>

  <!-- Поле поиска, которое появляется при нажатии на иконку -->
  <Transition name="cartPopup">
    <div
      v-if="isSearchOpen"
      class="transition-all duration-300 flex items-center"
      :class="{ 'w-48': isSearchOpen, 'w-0 overflow-hidden': !isSearchOpen }"
    >
      <input
        type="text"
        placeholder="Пошук товарів..."
        v-model="searchQuery"
        @blur="handleBlur"
        @input="debouncedSearch"
        class="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:border-slate-600 transition-all duration-300"
      />
    </div>
  </Transition>
  <!-- SearchPopup -->
  <Transition name="fade">
    <div
      v-if="showResults"
      class="absolute top-[96px] mt-2 w-[350px] bg-white rounded-lg shadow-lg z-50 py-2"
    >
      <!-- Loader -->
      <div v-if="isSearchLoading" class="p-8 flex justify-center">
        <Preloader />
      </div>

      <!-- No results -->
      <div v-else-if="!searchResults.length" class="p-8 text-center">
        <p class="text-slate-500">Нічого не знайдено</p>
      </div>

      <!-- Results -->
      <div v-else>
        <div
          v-for="product in searchResults"
          :key="product.id"
          class="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 rounded-lg"
          @mousedown="handleProductClick(product)"
        >
          <img :src="product.imageUrl" class="w-12 h-12 object-contain rounded-lg" />
          <div>
            <p class="text-sm font-medium">{{ product.name }}</p>
            <div class="flex items-center gap-2">
              <p class="text-md text-gray-600">{{ product.price }} ₴</p>
              <p class="text-xs text-gray-500 line-through">{{ product.oldPrice }} ₴</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { IProduct } from "~/store/types/product.types";
const config = useRuntimeConfig();

const isSearchOpen = ref(false);
const searchQuery = ref("");
const searchResults = ref<IProduct[]>([]);
const showResults = ref(false);
const isSearchLoading = ref(false);

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
};

const debouncedSearch = useDebounceFn(async () => {
  if (searchQuery.value.length < 2) {
    searchResults.value = [];
    return;
  }

  try {
    isSearchLoading.value = true;
    showResults.value = true;
    const results: IProduct[] = await $fetch(`${config.public.apiBase}/products/search`, {
      query: { query: searchQuery.value },
    });
    searchResults.value = results;
  } catch (error) {
    console.error("Search error:", error);
    searchResults.value = [];
  } finally {
    isSearchLoading.value = false;
  }
}, 300);

const handleBlur = () => {
  setTimeout(() => {
    showResults.value = false;
  }, 200);
};

const handleProductClick = (product: IProduct) => {
  navigateTo(`/product/${product.slug}`);
  searchQuery.value = "";
  showResults.value = false;
};
</script>

<style scoped></style>
