<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useCategoryStore } from "~/store/categoriesStore";

const categoryStore = useCategoryStore();

const links = computed(() => categoryStore.categories);
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Категорії</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="flex flex-col gap-2 w-[250px] py-2">
            <li v-for="link in links" :key="link.id">
              <NavigationMenuLink as-child>
                <NuxtLink
                  :to="`/catalog/${link.slug}`"
                  class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div class="text-sm font-medium leading-none">{{ link.name }}</div>
                </NuxtLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/catalog" :class="navigationMenuTriggerStyle()">
          Каталог
        </NavigationMenuLink>
      </NavigationMenuItem>
      <!-- <NavigationMenuItem>
        <NavigationMenuLink href="/catalog" :class="navigationMenuTriggerStyle()">
          Блог
        </NavigationMenuLink>
      </NavigationMenuItem> -->
      <NavigationMenuItem>
        <NavigationMenuLink href="/catalog" :class="navigationMenuTriggerStyle()">
          Про нас
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
