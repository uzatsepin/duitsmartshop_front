<template>
  <Header />

  <NuxtLayout name="default">
    <div>
      <h1 class="text-2xl font-bold">Особистий кабінет</h1>
      <p class="text-gray-500">Привіт, {{ authStore.userData?.username }}</p>
    </div>

    <div class="grid grid-cols-[300px_1fr] mt-8 gap-12 mb-24">
      <UserSidebar />

      <div class="bg-white shadow-md rounded-2xl p-4">
        <slot>
          <NuxtPage />
        </slot>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/authStore";

const authStore = useAuthStore();
</script>
