<template>
  <div class="bg-white shadow-md rounded-2xl py-4 h-fit">
    <h2 class="pl-4 mb-4 font-bold pb-3 border-b border-slate-200">Навігація</h2>
    <ul class="flex flex-col gap-2">
      <li>
        <NuxtLink
          to="/cabinet/orders"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/cabinet/orders' ? 'bg-slate-100' : 'hover:bg-slate-100',
          ]"
        >
          <Icon name="uil:cart" class="w-6 h-6 text-slate-600" />
          Замовлення
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/cabinet/reviews"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/cabinet/reviews' ? 'bg-slate-100' : 'hover:bg-slate-100',
          ]"
        >
          <Icon name="lets-icons:comment" class="w-6 h-6 text-slate-600" />
          Мої відгуки <span>(0)</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/cabinet/settings"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/cabinet/settings' ? 'bg-slate-100' : 'hover:bg-slate-100',
          ]"
        >
          <Icon name="mdi:cog" class="w-6 h-6 text-slate-600" />
          Налаштування
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
