<template>
  <Header />
  <NuxtLayout name="default">
    <div class="mt-6">
      <h1 class="text-2xl font-bold text-slate-900">
        Каталог товарів – {{ categoryName?.name }}
      </h1>

      <div class="mt-8 flex gap-2">
        <CatalogBadges
          v-for="item in catalogItems"
          :key="item.id"
          :catalogItem="item"
          :active="categoryName?.id === item.id"
        />
      </div>

      <ClientOnly>
        <template v-if="!isLoading">
          <div v-if="catalogProducts.length > 0" class="mt-12 grid grid-cols-4 gap-4">
            <ProductItem
              class="w-full"
              v-for="product in catalogProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <div v-else class="mt-12">
            <h3 class="text-center text-2xl mt-6 text-slate-500">
              В категорії
              <span class="text-slate-700">{{ categoryName?.name?.toLowerCase() }}</span>
              товарів не знайдено
            </h3>
          </div>
        </template>

        <template #fallback>
          <div class="mt-12">
            <Preloader />
          </div>
        </template>
      </ClientOnly>

      <!-- <CatalogBlog /> -->

      <CatalogDescr />
    </div>
  </NuxtLayout>

  <Footer />
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "~/store/categoriesStore";
import { useProductsStore } from "~/store/productsStore";

const route = useRoute();
const categoryStore = useCategoryStore();
const productsStore = useProductsStore();
const isLoading = ref<boolean>(false);

const catalogItems = computed(() => categoryStore.categories);

const categoryName = computed(() =>
  categoryStore.categories.find((item) => item.slug === route.params.category)
);

const catalogProducts = computed(() => productsStore.productsByCategory);

watch(
  () => route.params.category,
  async (newCategory) => {
    if (newCategory && categoryName.value?.id) {
      try {
        isLoading.value = true;
        await productsStore.fetchProductCategory(categoryName.value.id);
        isLoading.value = false;
      } catch (e) {
        console.error("Error:", e);
      } finally {
        isLoading.value = false;
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
