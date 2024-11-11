<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="review in userReviews"
      :key="review.id"
      class="border border-gray-300 rounded-lg p-4 bg-white"
    >
      <div class="flex items-center">
        <img
          :src="review.product.imageUrl"
          alt="Product Image"
          class="w-12 h-12 object-cover rounded-md"
        />
        <div class="flex-grow">
          <h3 class="text-lg font-semibold">{{ review.product.name }}</h3>
          <p class="text-sm text-gray-500">
            {{ formatDate(review?.created) }}
          </p>
        </div>
        <div class="flex items-center">
          <Button @click="openReviewPopup(review)" class="">Редагувати</Button>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-base">{{ review.text }}</p>
        <div class="mt-2 flex justify-between items-center">
          <span class="text-sm text-gray-500">Лайки: {{ review.likes }}</span>
        </div>
      </div>
    </div>

    <PopupCenter v-if="isPopupOpen" @close="closeReviewPopup" class="w-[500px]">
      <template #title>Редактировать отзыв</template>
      <template #default>
        <div class="flex items-center justify-center gap-2">
          <span
            v-for="star in 5"
            :key="star"
            @click="setRating(star)"
            @mouseover="hoverRating(star)"
            @mouseleave="hoverRating(0)"
          >
            <Icon
              :name="
                star <= (hoveredRating || rating)
                  ? 'flowbite:star-solid'
                  : 'flowbite:star-outline'
              "
              class="w-8 h-8 text-[#FFBF00] cursor-pointer"
            />
          </span>
        </div>
        <textarea
          v-model="selectedReviewText"
          rows="5"
          cols="10"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
        ></textarea>
        <button
          @click="saveReview"
          class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mt-4"
        >
          Сохранить
        </button>
      </template>
    </PopupCenter>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/authStore";
import type { IReviewUser } from "~/store/types/reviews.types";

const userReviews = ref<IReviewUser[]>([]);
const config = useRuntimeConfig();
const authStore = useAuthStore();
const isPopupOpen = ref(false);
const selectedReview = ref<IReviewUser | null>(null);
const selectedReviewText = ref<string>("");
const { $toast } = useNuxtApp();

const setRating = (star: number) => {
  rating.value = star;
};

const hoverRating = (star: number) => {
  hoveredRating.value = star;
};

const rating = ref(0);
const hoveredRating = ref(0);

const openReviewPopup = (review: IReviewUser) => {
  selectedReview.value = { ...review };
  selectedReviewText.value = review.text;
  rating.value = review.rating;
  isPopupOpen.value = true;
};

const closeReviewPopup = () => {
  isPopupOpen.value = false;
  selectedReview.value = null;
  selectedReviewText.value = "";
};

const saveReview = async () => {
  try {
    if (selectedReview.value) {
      const response = await $fetch(
        `${config.public.apiBase}/review/${selectedReview.value.id}`,
        {
          method: "PUT",
          body: { text: selectedReviewText.value, rating: rating.value },
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
        }
      );
      const index = userReviews.value.findIndex(
        (review) => review.id === selectedReview.value?.id
      );
      if (index !== -1) {
        if (userReviews.value[index]) {
          userReviews.value[index]!.text = selectedReviewText.value;
        }
      }
      closeReviewPopup();
      $toast.success("Отзыв успешно обновлен");
    }
  } catch (error) {
    console.error("Error updating review:", error);
    $toast.error("Ошибка при обновлении отзыва");
  }
};

onMounted(async () => {
  const response = await $fetch<IReviewUser[]>(
    `${config.public.apiBase}/review/user/${authStore.userData?.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${useCookie("auth_token").value}`,
      },
    }
  );
  userReviews.value = response;
});
</script>

<style scoped></style>
