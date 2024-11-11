<script setup lang="ts"></script>

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
