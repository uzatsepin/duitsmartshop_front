<template>
  <div
    class="w-[300px] cursor-pointer hover:shadow-xl transition-all duration-300 relative rounded-2xl border border-slate-200"
  >
    <NuxtLink :to="`/product/${product?.slug || 'undefined'}`">
      <NuxtImg
        :src="product?.imageUrl"
        class="w-full max-h-[260px] min-h-[260px] object-contain rounded-t-2xl bg-white"
        :placeholder="true"
        :alt="product?.name"
        :title="product?.name"
      />
    </NuxtLink>
    <div
      v-if="(product?.quantity ?? 0) > 10"
      class="py-[4px] px-[12px] bg-teal-200 text-teal-700 absolute top-3 left-3 rounded-2xl"
    >
      {{ product?.isInStock ? "В наявності" : "" }}
    </div>
    <div
      v-if="(product?.quantity ?? 0) <= 10"
      class="py-[4px] px-[12px] bg-[#ffedcc] text-[#e59400] absolute top-3 left-3 rounded-2xl"
    >
      {{ product?.isInStock ? "Закінчується" : "" }}
    </div>
    <div class="p-4 pt-6 relative bg-white rounded-b-2xl">
      <NuxtLink :to="`/product/${product?.slug || '1'}`">
        <h2
          class="text-md text-slate-800 line-clamp-2 min-h-[48px] text-left font-bold hover:underline underline-offset-2"
        >
          {{ product?.name || "" }}
        </h2>
      </NuxtLink>
      <div class="flex items-center mt-2 gap-2" v-if="product?.reviews.length">
        <div class="flex items-center gap-[2px]">
          <NuxtImg
            v-for="i in filledStars"
            :key="'filled-' + i"
            src="icons/rating-icon-fill.svg"
            class="w-4 h-4"
          />
          <NuxtImg
            v-for="i in emptyStars"
            :key="'empty-' + i"
            src="icons/rating-icon-empty.svg"
            class="w-4 h-4"
          />
        </div>
        <Icon name="lets-icons:comment" class="w-6 h-6 text-slate-500" />
        <p class="text-sm text-slate-500">{{ reviewCount }} {{ reviewWord }}</p>
      </div>
      <NuxtLink
        :to="`/product/${product?.slug || 'undefined'}`"
        class="flex items-center gap-[2px] mt-2"
        v-else
      >
        <Icon name="lets-icons:comment" class="w-6 h-6 text-slate-500" />
        <p class="text-sm text-slate-500">Ще немає відгуків.</p>
      </NuxtLink>
      <div class="mt-2">
        <div class="flex items-center gap-2">
          <p v-if="product?.oldPrice" class="text-md text-slate-500 line-through">
            {{ product?.oldPrice }} ₴
          </p>
          <span
            v-if="discountPrice"
            class="py-[1px] px-[4px] bg-red-100 text-red-600 text-sm font-bold rounded"
          >
            -{{ discountPrice }}%
          </span>
        </div>
        <p class="text-2xl mt-2 text-slate-800 font-bold text-left">
          {{ product?.price }} ₴
        </p>
      </div>
      <div class="text-slate-600 text-sm mt-1 text-left min-h-[20px]">
        {{ product?.credit || "" }}
      </div>
      <div class="mt-2 flex items-center gap-2">
        <Icon name="hugeicons:truck-delivery" class="w-5 h-5 text-green-600" />
        <span class="text-green-600 text-sm">Відправимо сьогодні</span>
      </div>
      <div
        class="p-1 mt-4 bg-[#fff4e5] rounded-full flex items-center justify-center w-10 h-10 absolute bottom-10 right-4 cursor-pointer hover:bg-[#ffe0b2] transition-all duration-300"
        @click="handleAddToCart(product?.id)"
      >
        <Icon
          name="uil:cart"
          class="w-6 h-6 text-[#ff9a01] hover:text-[#e58a00] transition-all duration-300"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/authStore";
import type { IProduct } from "~/store/types/product.types";

const props = defineProps<{ product?: IProduct }>();

const authStore = useAuthStore();
const discountPrice = computed(() => {
  return Math.round(
    (((props.product?.oldPrice ?? 0) - (props.product?.price ?? 0)) /
      (props.product?.oldPrice ?? 1)) *
      100
  );
});

const { addToCart } = useCart();

const reviewCount = computed(() => props.product?.reviews?.length || 0);

const reviewWord = computed(() => {
  const count = reviewCount.value;
  if (count === 1) return "відгук";
  if (count >= 2 && count <= 4) return "відгуки";
  return "відгуків";
});

const averageRating = computed(() => {
  if (!props.product?.reviews || props.product.reviews.length === 0) {
    return 0;
  }

  const totalRating = props.product.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const average = totalRating / props.product.reviews.length;

  return Math.round(average);
});

const filledStars = computed(() => averageRating.value);
const emptyStars = computed(() => 5 - filledStars.value);

const handleAddToCart = (productId: number | undefined) => {
  if (!authStore.userData) {
    authStore.authMenuOpen();
  } else {
    addToCart(productId);
  }
};
</script>
