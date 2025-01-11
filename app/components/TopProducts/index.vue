<template>
  <div class="mt-12">
    <h2 class="text-2xl font-bold text-slate-800">Популярні товари</h2>

    <carousel :items-to-show="1" class="mt-12" v-bind="carouselConfig">
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

const carouselConfig = {
  gap: 24,
  wrapAround: true,
  autoplay: 2500,
  transition: 500,
  pauseAutoplayOnHover: true,
  height: "100%",
  breakpoints: {
    1440: {
      itemsToShow: 4,
    },
    1366: {
      itemsToShow: 3,
    },
    768: {
      gap: 16,
      itemsToShow: 2,
    },
    0: {
      itemsToShow: 1.3,
      wrapAround: false,
      gap: 8,
    },
  },
};
</script>

<style>
.carousel__prev,
.carousel__next {
  @apply bg-zinc-600 text-white rounded-full w-10 h-10 items-center justify-center transition-all duration-300 z-50 hidden md:flex;
}

.carousel__prev:hover,
.carousel__next:hover {
  @apply bg-green-500 text-black;
}

.carousel__pagination {
  @apply hidden md:flex mt-12 -bottom-8 items-center justify-center w-full z-50;
}

.carousel__pagination-button {
  @apply bg-zinc-700 w-[10px] h-[10px] rounded-full mx-2 transition-all duration-300 p-0 after:hidden;
}

.carousel__pagination-button--active {
  @apply bg-green-500 w-3 h-3;
}
</style>
