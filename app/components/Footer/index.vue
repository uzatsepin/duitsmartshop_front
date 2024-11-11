<template>
  <footer class="bg-white mt-12">
    <NuxtLayout name="default">
      <div class="grid grid-cols-3 gap-10 p-10 items-end w-full">
        <!--        Contacts-->
        <div>
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center gap-2">
              <NuxtImg src="/logo.svg" class="h-16" />
              <p class="text-xl font-bold text-gray-800">DuitSmartHome</p>
            </NuxtLink>
          </div>

          <div class="mt-4">
            <h2 class="font-bold text-lg">Контакти</h2>

            <ul class="mt-4 flex flex-col gap-2">
              <li>
                <NuxtLink
                  to="mailto:14363984@gsuite.duit.edu.ua"
                  class="flex items-center"
                >
                  <Icon
                    name="material-symbols:mail-outline"
                    class="w-5 h-5 text-slate-500 mr-2"
                  />
                  <span class="text-slate-500 mr-1">Email:</span>
                  <span
                    class="text-slate-500 hover:text-slate-700 transition-colors duration-300"
                    >14363984@gsuite.duit.edu.ua</span
                  >
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="tel:+380660000000" class="flex items-center">
                  <Icon name="line-md:phone" class="w-5 h-5 text-slate-500 mr-2" />
                  <span class="text-slate-500 mr-1">Телефон:</span>
                  <span
                    class="text-slate-500 hover:text-slate-700 transition-colors duration-300"
                    >+380-(66)-000-00-00</span
                  >
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="https://maps.app.goo.gl/GG9p8vfHTXSNDGzs8"
                  class="flex items-center"
                >
                  <Icon name="tdesign:location" class="w-5 h-5 text-slate-500 mr-2" />
                  <span class="text-slate-500 mr-1">Адреса:</span>
                  <span
                    class="text-slate-500 hover:text-slate-700 transition-colors duration-300"
                    >м. Київ, вулиця Івана Огієнко</span
                  >
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <!--        Product Links-->
        <div class="mt-4">
          <h2 class="font-bold text-lg">Категорії</h2>

          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="link in categoriesLinks" :key="link.id">
              <NuxtLink
                :to="`/catalog/${link.slug}`"
                class="text-slate-500 hover:text-slate-700 transition-colors duration-300"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!--        Company Links-->
        <div class="mt-4">
          <h2 class="font-bold text-lg">Про нас</h2>

          <ul class="mt-4 flex flex-col gap-2">
            <!-- <li>
              <NuxtLink to="/blog" class="text-slate-500 hover:text-slate-700 transition-colors duration-300">
                Блог
              </NuxtLink>
            </li> -->
            <li>
              <NuxtLink
                to="mailto:14363984@gsuite.duit.edu.ua"
                class="text-slate-500 hover:text-slate-700 transition-colors duration-300"
              >
                Про компанію
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="mailto:14363984@gsuite.duit.edu.ua"
                class="text-slate-500 hover:text-slate-700 transition-colors duration-300"
              >
                Доставка і оплата
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="mailto:14363984@gsuite.duit.edu.ua"
                class="text-slate-500 hover:text-slate-700 transition-colors duration-300"
              >
                Політика конфіденційності
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="mailto:14363984@gsuite.duit.edu.ua"
                class="text-slate-500 hover:text-slate-700 transition-colors duration-300"
              >
                Контакти
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex justify-between pt-4 border-t border-slate-200">
        <p class="text-sm text-gray-500">© 2024 DuitSmartHome. Всі права захищені.</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/">
            <Icon
              name="line-md:instagram"
              class="w-5 h-5 text-slate-500 hover:text-slate-700 transition-colors duration-300"
            />
          </NuxtLink>
          <NuxtLink to="/">
            <Icon
              name="line-md:telegram"
              class="w-5 h-5 text-slate-500 hover:text-slate-700 transition-colors duration-300"
            />
          </NuxtLink>
        </div>
      </div>
    </NuxtLayout>
  </footer>
</template>

<script setup lang="ts">
import { useCategoryStore } from "~/store/categoriesStore";

const categoriesStore = useCategoryStore();

const categoriesLinks = computed(() => categoriesStore.categories);
</script>

<style scoped></style>
