<template>
  <h1 class="text-3xl font-bold mt-2">{{ name }}</h1>
  <div class="flex items-center justify-between mt-4">
    <div class="flex items-center mt-2 gap-2" v-if="reviews?.length">
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
    <div class="flex items-center gap-[2px] mt-2" v-else>
      <Icon name="lets-icons:comment" class="w-6 h-6 text-slate-500" />
      <p class="text-sm text-slate-500">Ще немає відгуків.</p>
    </div>
    <div
      class="flex items-center gap-2 px-4 py-2 bg-white rounded-full hover:bg-slate-100 transition-all duration-300 cursor-pointer"
    >
      <Icon name="lucide:copy" />
      <span class="text-slate-600">Артикул:</span>
      <span class="font-bold">{{ article }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  article: String,
  reviews: Object,
});

const reviewCount = computed(() => props.reviews?.length || 0);

const reviewWord = computed(() => {
  const count = reviewCount.value;
  if (count === 1) return "відгук";
  if (count >= 2 && count <= 4) return "відгуки";
  return "відгуків";
});

interface Review {
  rating: number;
}

const averageRating = computed<number>(() => {
  if (!props.reviews || props.reviews.length === 0) {
    return 0;
  }

  const totalRating = props.reviews.reduce(
    (sum: number, review: Review) => sum + review.rating,
    0
  );
  const average = totalRating / props.reviews.length;

  return Math.round(average);
});

const filledStars = computed(() => averageRating.value);
const emptyStars = computed(() => 5 - filledStars.value);
</script>

<style scoped></style>
