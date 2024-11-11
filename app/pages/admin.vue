<template>
  <Header />

  <NuxtLayout name="default">
    <div>
      <h1 class="text-2xl font-bold">Admin</h1>
      <p class="text-gray-500">Ви зайшли у режимі адміністратора</p>
    </div>

    <div class="grid grid-cols-[300px_1fr] mt-8 gap-12 mb-24">
      <AdminSidebar />

      <div class="bg-white shadow-md rounded-2xl p-4">
        <slot>
          <NuxtPage />
        </slot>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});
</script>
