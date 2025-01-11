<script setup lang="ts">
useSeoMeta({
  title: "Головна | Інтернет-магазин DuitSmartHome",
  description:
    "Інтернет-магазин DuitSmartHome пропонує широкий асортимент товарів для розумного будинку, це датчики, вимикачі, розумні лампочки, сенсори, панелі керування та багато іншого.",
  keywords:
    "smarthome, aqara, xiaomi, tuya, розумний будинок, товари для розумних будинків, датчики, вимикачі, розумні лампочки, сенсори, панелі керування",
  ogTitle: "Головна | Інтернет-магазин DuitSmartHome",
  ogDescription:
    "Інтернет-магазин DuitSmartHome пропонує широкий асортимент товарів для розумного будинку, це датчики, вимикачі, розумні лампочки, сенсори, панелі керування та багато іншого.",
  ogUrl: "https://felearn.pro/",
  ogType: "website",
  ogImage: "https://felearn.pro/og-image.jpg",
});
</script>

<template>
  <div>
    <Header />
    <main class="container mx-auto px-4 py-4">
      <Hero />
      <Brands />
      <TopProducts />
    </main>
    <Categories />
    <NuxtLayout>
      <About />
    </NuxtLayout>
    <Footer />
  </div>
</template>
