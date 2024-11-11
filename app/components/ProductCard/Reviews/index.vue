<template>
  <section class="mt-12 p-6 bg-white rounded-2xl">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-slate-600 text-2xl">
        Відгуки про товар <span class="text-slate-900">{{productStore?.product?.name}}</span> ({{ reviews.length }})
      </h2>
      <Button @click="isReviewOpen = true">Написати відгук</Button>
    </div>

    <div class="mt-4 flex gap-4 overflow-x-scroll no-scrollbar">
      <ProductCardReviewsItem v-for="review in reviews" :key="review?.id" :review="review" @fetchReview="fetchReview"/>
    </div>

    <Transition name="popup" v-if="isReviewOpen" @close="isReviewOpen = false">
      <PopupCenter>
        <template #title>Додати відгук</template>
        <template #default>
          <div class="mt-4 flex flex-col gap-4">
            <div class="flex items-center justify-center gap-2">
              <span v-for="star in 5" :key="star" @click="setRating(star)" @mouseover="hoverRating(star)" @mouseleave="hoverRating(0)">
                <Icon :name="star <= (hoveredRating || rating) ? 'flowbite:star-solid' : 'flowbite:star-outline'" class="w-8 h-8 text-[#FFBF00] cursor-pointer" />
              </span>
            </div>

            <textarea v-model="reviewText" placeholder="Ваш відгук" class="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"></textarea>

            <Button @click="publishReview" class="w-full">Опублікувати</Button>
          </div>
        </template>
      </PopupCenter>
    </Transition>

    <Preloader v-if="addReviewLoading" />
  </section>
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/productsStore";
import type { IReview } from "~/store/types/reviews.types";
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();

const reviews = ref<IReview[]>([]);
const productStore = useProductsStore();
const productId = computed(() => productStore.product?.id);
const isReviewOpen = ref(false)
const rating = ref(0);
const hoveredRating = ref(0);
const reviewText = ref('');
const addReviewLoading = ref(false);

const setRating = (star: number) => {
  rating.value = star;
};

const hoverRating = (star: number) => {
  hoveredRating.value = star;
};


const fetchReview = async () => {
  if (productId.value) {
    const reviewData = await $fetch<IReview[]>(`${config.public.apiBase}/review/product/${productId.value}`);
    reviews.value = reviewData;
  }
};

const publishReview = async () => {
  try {
    addReviewLoading.value = true;
    await $fetch(`${config.public.apiBase}/review`, {
      method: 'POST',
      body: {
        productId: productId.value,
        rating: rating.value,
        text: reviewText.value
      },
      headers: {
        'Authorization': `Bearer ${useCookie('auth_token').value}`
      }
    });
    $toast.success('Відгук опубліковано');
    isReviewOpen.value = false;
    fetchReview();
    addReviewLoading.value = false;
  } catch (error) {
    console.error('Error publishing review:', error);
    $toast.error('Помилка при публікації відгуку');
  }
};

watch(productId, async (newId) => {
  if (newId) {
    await fetchReview();
  }
}, { immediate: true });

onMounted(() => {
  fetchReview();
});
</script>

<style scoped></style>
