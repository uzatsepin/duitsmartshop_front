<template>
  <div class="flex items-center justify-between gap-6 border-b border-slate-300 pb-4 last:border-b-0">
    <div class="flex items-center gap-4">
      <NuxtImg :src="cartItem.product.imageUrl" class="w-14 min-w-14 h-14 object-contain rounded-2xl" />
      <div>
        <h3 class="text-slate-500 text-sm line-clamp-2">{{ cartItem.product.name }}</h3>
        <!-- Quantity controls -->
        <div class="flex items-center gap-2 mt-2">
          <button
            @click="updateQuantity(-1)"
            class="w-6 h-6 flex items-center justify-center rounded-full border border-slate-300 hover:border-slate-400 transition-colors"
            :disabled="cartItem.quantity <= 1"
          >
            <Icon name="material-symbols:remove" class="w-4 h-4 text-slate-500" />
          </button>

          <span class="text-sm text-slate-700 font-bold min-w-[20px] text-center">
            {{ cartItem.quantity }}
          </span>

          <button
            @click="updateQuantity(1)"
            class="w-6 h-6 flex items-center justify-center rounded-full border border-slate-300 hover:border-slate-400 transition-colors"
          >
            <Icon name="material-symbols:add" class="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
    <p class="text-slate-600 whitespace-nowrap">{{ cartItem.product.price }} ₴</p>
    <Icon
      name="mi:delete"
      class="w-6 min-w-6 h-6 text-slate-500 hover:text-red-600 cursor-pointer transition-colors duration-300"
      @click="$emit('remove')"
    />
  </div>
</template>

<script setup lang="ts">
import type { ICartItem } from "~/store/types/cart.types";

const props = defineProps<{
  cartItem: ICartItem
}>();

const emit = defineEmits<{
  (e: "update", quantity: number): void;
  (e: "remove"): void;
}>();

const updateQuantity = (change: number) => {
  const newQuantity = props.cartItem.quantity + change;
  if (newQuantity > 0) {
    emit("update", newQuantity);
  }
};
</script>
