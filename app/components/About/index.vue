<template>
  <div class="mt-12">
    <h2 class="text-center text-3xl font-bold">Переваги розумного будинку сьогодні 👇</h2>

    <div class="mt-12 flex gap-8 items-center flex-col md:flex-row">
      <NuxtImg src="icons/smart-home.jpg" class="rounded-3xl" />

      <div>
        <h2 class="mb-8 font-bold text-2xl mx-auto text-center">
          Сьогодні розумний будинок перестав бути розкішшю, доступною лише ентузіастам
          технологій.
        </h2>
        <div class="grid grid-cols-2 gap-6 items-center">
          <div
            class="flex gap-2 flex-col items-center p-4 border border-slate-200 rounded-xl"
            v-for="item in benefitItems"
            :key="item.title"
          >
            <div
              class="p-4 bg-[#fff4e5] rounded-full w-fit flex items-center justify-center"
            >
              <Icon :name="item.icon" class="w-10 h-10 text-[#ff9a01]" />
            </div>
            <h3 class="font-bold text-lg">{{ item.title }}</h3>
          </div>
        </div>

        <Button
          class="flex items-center gap-2 justify-center w-fit mx-auto mt-8 py-6 px-8 text-md font-bold"
        >
          <Icon name="uil:message" class="w-6 h-6" />
          Замовити консультацію
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const benefitItems = [
  {
    icon: "hugeicons:setup-01",
    title: "Легкість встановлення",
  },
  {
    icon: "mdi:smartphone-wireless",
    title: "Централізоване управління",
  },
  {
    icon: "mdi:smartphone-lock",
    title: "Безпека та економія",
  },
  {
    icon: "solar:smartphone-rotate-orientation-broken",
    title: "Гнучкість і адаптивність",
  },
];
</script>

<style scoped></style>
