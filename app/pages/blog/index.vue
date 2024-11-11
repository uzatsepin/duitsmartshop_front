<template>
  <Header />
  <NuxtLayout name="default">
    <div class="mt-6">
      <h1 class="text-2xl font-bold text-slate-900">Блог</h1>

      <div class="mt-12 grid grid-cols-4 gap-8">

        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />

      </div>

    </div>
  </NuxtLayout>

  <Footer />
</template>

<script setup lang="ts">
</script>

<style scoped></style>