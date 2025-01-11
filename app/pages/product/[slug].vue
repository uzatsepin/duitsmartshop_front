<template>
  <Header />
  <NuxtLayout>
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-14 mt-4 lg:mt-12">
      <div class="w-full max-w-[600px]">
        <NuxtImg
          :src="product.imageUrl"
          class="lg:min-w-[600px] max-h-[600px] w-full object-contain block rounded-3xl"
          :alt="product.name"
          :title="product.name"
          :placeholder="true"
        />
      </div>
      <div class="">
        <NuxtLink
          :to="`/catalog/${product?.category?.slug}`"
          class="flex items-center gap-2 group"
          title="Повернутися до категорії"
        >
          <Icon name="ep:arrow-left-bold" class="w-4 h-4 group-hover:text-slate-500" />
          <span class="group-hover:text-slate-500">{{ product?.category?.name }}</span>
        </NuxtLink>
        <ProductCardNameRating
          :name="product.name"
          :article="product.article"
          :reviews="product.reviews"
        />
        <ProductCardTechnologies :technologies="technologies" />
        <ProductCardPrice
          :price="product.price"
          :oldPrice="product.oldPrice"
          :productId="product.id"
        />
        <div class="mt-2">
          <p class="text-md text-slate-600 lg:flex items-center gap-2">
            <Icon name="iconamoon:discount" class="w-6 h-6 text-green-600" />
            Замов сьогодні і ми відправимо тобі товар зі знижкою
            <span class="text-red-400 inline">5%</span>
          </p>
        </div>
        <ProductCardShortDescr
          :descrItems="
            Array.isArray(product?.characteristics) ? product.characteristics : []
          "
          v-if="product?.characteristics"
        />
      </div>
    </div>
    <ProductCardDescr :name="product.name" :description="product.description" />
    <ProductCardReviews :reviews="product.reviews" />
    <!-- <LazyProductCardFaq /> -->
    <LazyProductCardSameProducts
      :categoryProducts="productsStore.productsByCategory"
      :loading="loadingCategory"
    />
  </NuxtLayout>
  <Footer />
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/productsStore";

const route = useRoute();
const productsStore = useProductsStore();
const loading = ref(true);
const loadingCategory = ref(false);
const product = computed(() => productsStore.product);

useHead({
  title: computed(() =>
    product?.value?.name
      ? `${product?.value?.name} – DuitSmartHome розумний будинок`
      : "DuitSmartHome розумний будинок"
  ),
  htmlAttrs: {
    lang: "uk",
  },
  link: [
    {
      rel: "canonical",
      href: `https://felearn.pro/product/${product?.value?.slug}`,
    },
  ],
});

useSeoMeta({
  title: computed(() =>
    product?.value?.name
      ? `${product?.value?.name} – DuitSmartHome розумний будинок`
      : "DuitSmartHome розумний будинок"
  ),
  description: computed(
    () => `${product?.value?.name} – Купити в Києві та Україні. Доставка по всій Україні.`
  ),

  ogType: "website",
  ogUrl: computed(() => `https://felearn.pro/product/${product?.value?.slug}`),
  ogImage: computed(() => product?.value?.imageUrl),
  ogTitle: computed(() =>
    product?.value?.name
      ? `${product?.value?.name} – DuitSmartHome розумний будинок`
      : "DuitSmartHome розумний будинок"
  ),

  author: "DuitSmartHome",
  robots: "index, follow",
  publisher: "DuitSmartHome",
});

onMounted(async () => {
  try {
    await productsStore.fetchProduct(route.params.slug as string);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    loading.value = false;
  }
});

watchEffect(async () => {
  if (product.value?.category?.id) {
    try {
      loadingCategory.value = true;
      await productsStore.fetchProductCategory(product.value.category.id);
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      loadingCategory.value = false;
    }
  }
});

const technologies = [
  {
    name: "HomeKit",
    icon: "icons/homekit-icon.svg",
  },
  {
    name: "Google Home",
    icon: "icons/google-home.svg",
  },
  {
    name: "Home Assistant",
    icon: "icons/homeassistant-icon.svg",
  },
  {
    name: "Smart Things",
    icon: "icons/smartthings-icon.svg",
  },
];
</script>

<style scoped></style>
