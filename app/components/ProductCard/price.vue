<template>
  <div class="mt-4 flex flex-col lg:flex-row gap-4 lg:gap-12 lg:items-center">
    <div class="flex flex-col lg:flex-row lg:gap-8">
      <div class="flex items-center gap-2">
        <p class="text-lg text-slate-500 line-through">{{ oldPrice }}₴</p>
        <p class="py-[1px] px-[4px] bg-red-100 text-red-600 text-sm font-bold rounded">
          -{{ discountPrice }}%
        </p>
      </div>
      <div>
        <p class="text-3xl mt-2 text-slate-800 font-bold">{{ price }}₴</p>
      </div>
    </div>
    <div class="flex gap-4 flex-col lg:flex-row">
      <Button class="py-4 px-8 text-md" @click="handleAddToCart(productId)">
        <Icon name="uil:cart" class="w-7 h-7 mr-3" />
        Купить
      </Button>
      <Button variant="outline" class="py-4 px-8">Отримати консультацію</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';

const authStore = useAuthStore();
const props = defineProps({
  price: Number,
  oldPrice: Number,
  productId: Number,
});

const discountPrice = computed(() => {
  return Math.round(
    (((props.oldPrice ?? 0) - (props.price ?? 0)) / (props.oldPrice ?? 1)) * 100
  );
});

const { addToCart } = useCart();

const handleAddToCart = (productId: number | undefined) => {
  if (!authStore.userData) {
    authStore.authMenuOpen();
  } else {
    addToCart(productId);
  }
};
</script>

<style scoped></style>
