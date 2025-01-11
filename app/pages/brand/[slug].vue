<template>
  <Header />
  <NuxtLayout name="default">
    <div class="mt-6 flex gap-3 items-center">
      <NuxtImg
        v-if="brand?.icon"
        :src="brand?.icon"
        :alt="brand?.name"
        class="w-12 h-12"
      />
      <h1 class="text-2xl font-bold text-slate-900">{{ brand?.name || slug }}</h1>
    </div>

    <div class="mt-6">
      <Preloader v-if="isLoading" />

      <div class="flex flex-wrap gap-4">
        <ProductItem
          v-for="product in productsByBrand"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

    <BrandsDescr v-if="brand" :brand="brand" />

    {{ pageTitle }}
  </NuxtLayout>

  <Footer />
</template>

<script setup lang="ts">
import type { IBrand } from "~/store/types/brand.types";
import type { IProduct } from "~/store/types/product.types";

const route = useRoute();
const slug = route.params.slug;
const config = useRuntimeConfig();
const productsByBrand = ref<IProduct[]>();
const brand = ref<IBrand | null>(null);
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

const pageTitle = computed(() => 
  brand.value?.name 
    ? `${brand.value.name} – Товари для розумного будинку з доставкою по Україні`
    : 'Товари для розумного будинку Київ'
)

const ogImage = computed(() => brand.value?.icon);

useHead({
  title: pageTitle,
  htmlAttrs: {
    lang: 'uk',
  },
  link: [
    {
      rel: 'canonical',
      href: `https://felearn.pro/brand/${slug}`,
    },
  ],
})

useSeoMeta({
  title: pageTitle,
  description: 'Пропонуємо широкий асортимент товарів для розумного будинку в Києві. Це датчики, вимикачі, розумні лампочки, сенсори, панелі керування та багато іншого.',

  ogTitle: pageTitle,
  ogDescription: 'Пропонуємо широкий асортимент товарів для розумного будинку в Києві. Це датчики, вимикачі, розумні лампочки, сенсори, панелі керування та багато іншого.',
  ogType: 'website',
  ogUrl: `https://felearn.pro/brand/${slug}`,
  ogImage: ogImage,

  author: 'DuitSmartHome',
  robots: 'index, follow',
  publisher: 'DuitSmartHome',
  
})

onMounted(async () => {
  try {
    isLoading.value = true;

    const [productsResponse, brandResponse] = await Promise.all([
      $fetch<IProduct[]>(`${config.public.apiBase}/products/brand/${slug}`),
      $fetch<IBrand>(`${config.public.apiBase}/brands/${slug}`),
    ]);

    productsByBrand.value = productsResponse;
    brand.value = brandResponse;
  } catch (e) {
    console.error("Error:", e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped></style>
