<template>
  <Header />
  <NuxtLayout name="default">

    <h1 class="font-bold text-2xl text-slate-900 mt-6 text-center">name of article</h1>

    <div class="mt-6 flex items-center justify-center">
      <NuxtImg src="https://placehold.co/1366x768" class="object-cover rounded-3xl"/>
    </div>

    <div class="mt-6 max-w-[1020px] mx-auto">
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>Andrii</p>
        </div>
        <p class="text-slate-600 text-sm">10.10.2024</p>
      </div>
      <div class="text-slate-900 space-y-4 mt-8">
        <h2 class="text-3xl font-bold text-slate-600">Розумний будинок разом з DuitSmartHome</h2>

        <p class="text-lg">
          Ласкаво просимо до <span class="font-semibold">DuitSmartHome</span> — вашого надійного партнера у світі розумних
          технологій для дому! Наш магазин пропонує широкий вибір пристроїв та рішень, що дозволять вам створити комфортний,
          безпечний та економічний розумний будинок.
        </p>

        <h2 class="text-2xl font-semibold text-slate-500">Чому варто обирати нас?</h2>

        <ul class="list-disc pl-6 space-y-2">
          <li>
            <span class="font-semibold">Якість та надійність:</span> Ми співпрацюємо тільки з перевіреними виробниками, тому ви
            можете бути впевнені в якості кожного придбаного продукту.
          </li>
          <li>
            <span class="font-semibold">Розумні ціни:</span> Наші товари доступні за вигідними цінами, що дозволяє вам побудувати
            розумний будинок без зайвих витрат.
          </li>
          <li>
            <span class="font-semibold">Професійна підтримка:</span> Наші фахівці завжди готові допомогти з вибором оптимальних
            рішень, встановленням та налаштуванням обладнання.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-slate-500">Переваги розумного будинку</h2>

        <ul class="list-disc pl-6 space-y-2">
          <li>
            <span class="font-semibold">Безпека:</span> Завдяки системам відеоспостереження, датчикам руху та сигналізаціям ви
            можете контролювати свій дім та бути впевненими у безпеці ваших близьких.
          </li>
          <li>
            <span class="font-semibold">Економія ресурсів:</span> Розумні системи освітлення та клімат-контролю допоможуть зменшити
            споживання енергії та знизити ваші комунальні витрати.
          </li>
          <li>
            <span class="font-semibold">Зручність:</span> Управляйте всім з вашого смартфона — освітлення, опалення, дверні замки
            та багато іншого тепер доступно в одному додатку.
          </li>
        </ul>

        <p class="text-lg">
          Створіть свій розумний дім разом з <span class="font-semibold">DuitSmartHome</span> та насолоджуйтесь комфортом,
          безпекою та сучасними технологіями, які покращать ваше життя!
        </p>
      </div>
    </div>

  </NuxtLayout>
  <Footer />
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

</script>

<style scoped>

</style>