import type { IProduct } from "./types/product.types";

export const useProductsStore = defineStore("products", () => {
  const productsByCategory = ref<IProduct[]>([]);
  const isLoaded = ref(false);
  const currentCategoryId = ref<number | null>(null);
  const allProducts = ref<IProduct[]>([]);
  const product = ref({} as IProduct);

  const fetchProductCategory = async (categoryId: number) => {
    if (currentCategoryId.value !== categoryId) {
      isLoaded.value = false;
      productsByCategory.value = [];
      currentCategoryId.value = categoryId;
    }

    if (isLoaded.value) return;

    try {
      const config = useRuntimeConfig();
      const data = await $fetch<[]>(
        `${config.public.apiBase}/products/category/${categoryId}`,
      );
      productsByCategory.value = data;
      isLoaded.value = true;
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
      productsByCategory.value = [];
      isLoaded.value = false;
    }
  };

  const fetchAllProducts = async () => {
    try {
      const config = useRuntimeConfig();
      const data = await $fetch<[]>(`${config.public.apiBase}/products`);
      allProducts.value = data;
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
      allProducts.value = [];
    }
  }

  const fetchProduct = async (slug:string) => {
    try {
      const config = useRuntimeConfig();
      const data = await $fetch<IProduct>(
        `${config.public.apiBase}/products/${slug}`,
      );
      product.value = data;
    } catch (error) {
      console.error("Ошибка при загрузке товара:", error);
      product.value = {} as IProduct;
    }
  }

  return {
    isLoaded,
    fetchProductCategory,
    productsByCategory,
    allProducts,
    fetchAllProducts,
    fetchProduct,
    product,
    currentCategoryId
  };
});
