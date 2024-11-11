<template>
  <div
    class="w-[350px] min-w-[300px] border border-slate-200 rounded-2xl p-6 flex flex-col h-full min-h-[364px] gap-4"
  >
    <div class="flex-grow">
      <div class="flex items-center justify-between border-b border-slate-200 pb-2">
        <div class="w-full flex items-center justify-between">
          <p class="text-gray-600 text-sm font-bold">
            {{ review?.user?.username }}
          </p>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-[2px]">
              <NuxtImg
                v-for="i in filledStars"
                :key="'filled-' + i"
                src="/icons/rating-icon-fill.svg"
                class="w-4 h-4"
              />
              <NuxtImg
                v-for="i in emptyStars"
                :key="'empty-' + i"
                src="/icons/rating-icon-empty.svg"
                class="w-4 h-4"
              />
            </div>
            <p class="text-gray-500 text-sm">{{ review?.rating }}</p>
          </div>
        </div>
      </div>

      <div class="mt-4 text-sm">
        {{ review?.text }}
      </div>
    </div>

    <div class="mt-auto flex justify-between items-center pt-3 border-t border-slate-200">
      <div class="flex items-center gap-2 group cursor-pointer" @click="likeReview">
        <Icon
          name="icon-park-outline:like"
          class="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-all duration-300"
        />
        <p
          class="text-gray-500 text-sm group-hover:text-gray-700 transition-all duration-300"
        >
          {{ review?.likes }}
        </p>
      </div>
      <time>{{
        review?.created ? formatDate(new Date(review.created).toISOString()) : "N/A"
      }}</time>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IReview } from "~/store/types/reviews.types";

const props = defineProps<{
  review: IReview | undefined;
}>();

const emit = defineEmits(["fetchReview"]);

const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const likes = ref(props.review?.likes || 0);
const filledStars = computed(() => props.review?.rating || 0);
const emptyStars = computed(() => 5 - filledStars.value);

const likeReview = async () => {
  if (!props.review) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/review/${props.review.id}/like`,
      {
        method: "POST",
      }
    );

    if (response) {
      likes.value += 1;
      props.review.likes = likes.value;
      $toast.success("Відгук лайкнуто");
      emit("fetchReview");
    }
  } catch (error) {
    console.error("Error liking review:", error);
    $toast.error("Помилка при лайку відгуку");
  }
};
</script>

<style scoped></style>
