<template>
  <div class="p-2">
    <h1 class="text-2xl font-bold mb-6">Додати товар</h1>

    <form @submit.prevent="createProduct" class="space-y-6">
      <!-- Basic Info -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2"
            >Назва товару</label
          >
          <input
            v-model="product.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Артикул</label>
          <input
            v-model="product.article"
            type="text"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Ціна</label>
          <input
            v-model="product.price"
            type="number"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Стара ціна</label>
          <input
            v-model="product.oldPrice"
            type="number"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Кількість</label>
          <input
            v-model="product.quantity"
            type="number"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2"
            >Гарантія (місяців)</label
          >
          <input
            v-model="product.warranty"
            type="text"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2"
            >Кредит (місяців)</label
          >
          <input
            v-model="product.credit"
            type="text"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Категорія</label>
          <select
            v-model="product.categoryId"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Опис</label>
        <AdminEditor v-model="product.description" />
      </div>

      <!-- Characteristics controls -->
      <div>
        <h2 class="block text-lg font-medium text-slate-700 mb-2">
          Додати характеристики
        </h2>
        <AdminCharControl
          :existingCharacteristics="existingCharacteristics"
          @update:characteristics="updateCharacteristics"
        />
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2"
          >Головне зображення товару</label
        >
        <div
          class="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-slate-500 transition-colors cursor-pointer"
        >
          <div class="flex flex-col items-center justify-center gap-2">
            <Icon
              name="material-symbols:upload"
              class="w-10 h-10 text-slate-400"
              v-if="!imagePreview"
            />
            <div class="text-center" v-if="!imagePreview">
              <p class="text-sm text-slate-600">Перетягніть зображення сюди або</p>
              <label class="text-slate-500 hover:text-slate-600 cursor-pointer">
                виберіть файл
                <input
                  type="file"
                  @change="handleImageUpload"
                  accept="image/*"
                  required
                  class="hidden"
                />
              </label>
            </div>
            <p class="text-xs text-slate-500 mt-1" v-if="!imagePreview">
              PNG, JPG, WebP до 5MB
            </p>
          </div>

          <!-- Preview -->
          <div v-if="imagePreview" class="mt-4">
            <img
              :src="imagePreview"
              alt="Preview"
              class="w-32 h-32 object-contain rounded-lg mx-auto"
            />
          </div>
        </div>
      </div>

      <Button type="submit" class="w-full py-6"> Додати товар </Button>
    </form>
    <client-only>
      <Toaster position="bottom-right" />
    </client-only>
    <Preloader v-if="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
import { useCategoryStore } from "~/store/categoriesStore";
import { useNuxtApp } from "#app";

const { $toast } = useNuxtApp();

const existingCharacteristics = ref<{ name: string; value: string }[]>([]);

const updateCharacteristics = (characteristics: { name: string; value: string }[]) => {
  product.value.characteristics = characteristics;
};

interface ProductForm {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  oldPrice?: number;
  warranty?: string;
  credit?: string;
  quantity: number;
  article?: string;
  image?: File;
  characteristics?: { name: string; value: string }[];
}

const product = ref<ProductForm>({
  name: "",
  price: 0,
  description: "",
  categoryId: 0,
  quantity: 0,
  characteristics: [],
});

const loading = ref(false);
const imagePreview = ref("");

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    $toast.error("Розмір файлу не може перевищувати 5MB");
    return;
  }

  if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
    $toast.error("Дозволені тільки PNG, JPG, WebP формати");
    return;
  }

  imagePreview.value = URL.createObjectURL(file);

  product.value.image = file;

  onUnmounted(() => {
    URL.revokeObjectURL(imagePreview.value);
  });
};

const createProduct = async () => {
  try {
    loading.value = true;
    const formData = new FormData();

    Object.entries(product.value).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "characteristics") {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const config = useRuntimeConfig();
    const authToken = useCookie("auth_token");
    const response = await $fetch(`${config.public.apiBase}/products/create`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    product.value = {
      name: "",
      price: 0,
      description: "",
      categoryId: 0,
      quantity: 0,
      characteristics: [],
    };

    imagePreview.value = "";
    $toast.success("Товар створено успішно");
    window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    $toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
  } finally {
    loading.value = false;
  }
};
</script>
