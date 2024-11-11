<template>
  <div class="bg-white shadow-md rounded-2xl py-4 h-fit">
    <h2 class="pl-4 mb-4 font-bold pb-3 border-b border-slate-200">Навігація</h2>
    <ul class="flex flex-col gap-2">
      <li>
        <NuxtLink
          to="/admin/add"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/admin/add' ? 'bg-slate-100' : 'hover:bg-slate-100',
          ]"
        >
          <Icon name="material-symbols-light:box-add" class="w-6 h-6 text-slate-600" />
          Додати товар
        </NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink
          to="/admin/category"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/admin/category' ? 'bg-slate-100' : 'hover:bg-slate-100'
          ]"
        >
        <Icon name="fluent:home-add-20-regular" class="w-6 h-6 text-slate-600" />
        Додати категорію
      </NuxtLink>
      </li> -->
      <li>
        <NuxtLink
          to="/admin/products"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/admin/products' ? 'bg-slate-100' : 'hover:bg-slate-100',
          ]"
        >
          <Icon name="mdi:package-variant-closed" class="w-6 h-6 text-slate-600" />
          Товари
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/admin/orders"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/admin/orders' ? 'bg-slate-100' : 'hover:bg-slate-100',
          ]"
        >
          <Icon name="uil:cart" class="w-6 h-6 text-slate-600" />
          Замовлення
        </NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink
          to="/admin/blog"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/admin/blog' ? 'bg-slate-100' : 'hover:bg-slate-100'
          ]"
        >
        <Icon name="mdi:file-document-edit" class="w-6 h-6 text-slate-600" />
          Статті блогу
        </NuxtLink>
      </li> -->
      <li>
        <NuxtLink
          to="/admin/settings"
          :class="[
            'flex items center gap-2 py-3 px-4 cursor-pointer transition-all duration-300',
            route.path === '/admin/settings' ? 'bg-slate-100' : 'hover:bg-slate-100',
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
