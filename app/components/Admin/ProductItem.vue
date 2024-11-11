<!-- components/Admin/ProductItem.vue -->
<template>
  <tr class="hover:bg-slate-50">
    <td class="px-6 py-4 border border-slate-200">
      <img
        :src="product.imageUrl"
        alt="Product"
        class="w-16 h-16 object-cover rounded-md"
      />
    </td>
    <td class="px-6 py-4 border border-slate-200 text-sm font-bold">
      {{ product.name }}
    </td>
    <td class="px-6 py-4 border border-slate-200 whitespace-nowrap text-sm font-bold">
      {{ product.price }} ₴
    </td>
    <td class="px-6 py-4 border border-slate-200 text-sm">{{ discountPrice }}%</td>
    <td class="px-6 py-4 border border-slate-200 text-sm">{{ product.quantity }} шт</td>
    <td class="px-6 py-4 border border-slate-200 text-sm">{{ product.views }}</td>
    <td class="px-6 py-4 border border-slate-200 text-sm">
      <div class="flex gap-2">
        <NuxtLink
          :to="'/admin/products/edit/' + product.slug"
          class="p-2 text-blue-600 hover:bg-blue-50 rounded-full flex items-center justify-center"
        >
          <Icon name="material-symbols:edit-outline" class="w-5 h-5" />
        </NuxtLink>
        <button
          class="p-2 text-red-600 hover:bg-red-50 rounded-full flex items-center justify-center"
          @click="handleOpenPopup"
        >
          <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
        </button>
      </div>
    </td>
  </tr>

  <PopupCenter v-if="deletePopup" @close="handleClosePopup">
    <template #title> Видалення товару</template>
    <template #default>
      Ви дійсно хочете видалити товар <span class="font-bold">{{ product.name }}?</span>

      <div class="mt-4 flex gap-2">
        <Button @click="deleteProduct(product.id)" class="w-full bg-red-500">Так</Button>
        <Button @click="handleClosePopup" class="w-full">Ні</Button>
      </div>
    </template>
  </PopupCenter>
  <client-only>
    <Toaster position="bottom-right" />
  </client-only>
</template>

<script setup lang="ts">
import type { IProduct } from "~/store/types/product.types";

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const emit = defineEmits(["updateProducts"]);
const deletePopup = ref(false);

const handleClosePopup = () => {
  deletePopup.value = false;
};

const handleOpenPopup = () => {
  deletePopup.value = true;
};

const props = defineProps<{
  product: IProduct;
}>();

const deleteProduct = async (id: number) => {
  try {
    const response = await $fetch(`${config.public.apiBase}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useCookie("auth_token").value}`,
      },
    });

    if (response) {
      $toast.success("Товар успішно видалено");
      handleClosePopup();
      emit("updateProducts");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    $toast.error("Помилка при видаленні товару");
  }
};

const discountPrice = computed(() => {
  return Math.round(
    (((props.product?.oldPrice ?? 0) - (props.product?.price ?? 0)) /
      (props.product?.oldPrice ?? 1)) *
      100
  );
});
</script>
