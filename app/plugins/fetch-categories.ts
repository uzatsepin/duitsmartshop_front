import { useCategoryStore } from "~/store/categoriesStore";

export default defineNuxtPlugin(async () => {
  const categoryStore = useCategoryStore();

  try {
    await categoryStore.fetchCategories();
  } catch (error) {
    console.error('Error loading categories:', error);
  }
});