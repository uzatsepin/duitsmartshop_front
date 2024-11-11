import type { IBrand } from "./types/brand.types";

export const useBrandsStore = defineStore('brands', () => {
  const brands = ref<IBrand[]>([]);
  const isLoaded = ref(false);

  const fetchBrands = async () => {
    if (isLoaded.value) return;

    try {
      const config = useRuntimeConfig();
      const data:IBrand[] = await $fetch(`${config.public.apiBase}/brands`);
      brands.value = data;
      isLoaded.value = true;
    } catch (error) {
      console.error('Ошибка при загрузке брендов:', error);
    }
  }

  return {
    brands,
    fetchBrands
  }
});