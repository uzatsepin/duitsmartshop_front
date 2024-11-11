import type { ICategory } from "~/store/types/category.types";

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<ICategory[]>([]);
  const isLoaded = ref(false);

  const fetchCategories = async () => {
    if (isLoaded.value) return;

    try {
      const config = useRuntimeConfig();
      const data = await $fetch<ICategory[]>(`${config.public.apiBase}/categories`);
      categories.value = data;
      isLoaded.value = true;
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  };

  return {
    categories,
    isLoaded,
    fetchCategories
  };
});