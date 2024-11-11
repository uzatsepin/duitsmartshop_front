<template>
  <table
    class="min-w-full bg-white shadow-md rounded-lg border border-slate-200 border-collapse"
  >
    <tbody>
      <tr>
        <td class="px-6 py-4 border border-slate-200">ID замовлення</td>
        <td class="px-6 py-4 border border-slate-200">{{ order.id }}</td>
      </tr>
      <tr>
        <td class="px-6 py-4 border border-slate-200">Дата замовлення</td>
        <td class="px-6 py-4 border border-slate-200">
          <time>{{ dayjs(order.orderDate).format("DD-MM-YY – HH:mm") }}</time>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 border border-slate-200">Сума замовлення</td>
        <td class="px-6 py-4 border border-slate-200">{{ order.totalAmount }} ₴</td>
      </tr>
      <tr>
        <td class="px-6 py-4 border border-slate-200">Статус</td>
        <td class="px-6 py-4 border border-slate-200">
          <div class="relative">
            <div
              @click="toggleDropdown"
              class="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-500"
            >
              <span>{{ translateOrderStatus(order.status) }}</span>
              <svg
                :class="{ 'transform rotate-180': isOpen }"
                class="w-4 h-4 ml-2 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </div>
            <transition name="fade">
              <ul
                v-if="isOpen"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
              >
                <li
                  v-for="(label, value) in orderStatusTranslations"
                  :key="value"
                  @click="updateOrderStatus(order, value)"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {{ label }}
                </li>
              </ul>
            </transition>
          </div>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 border border-slate-200">Имя пользователя</td>
        <td class="px-6 py-4 border border-slate-200">
          {{ order.user?.username }}
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 border border-slate-200">Email пользователя</td>
        <td class="px-6 py-4 border border-slate-200">
          {{ order.user.email }}
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Таблица товаров -->
  <h3 class="my-6 font-bold text-lg">Товари в замовленні</h3>
  <table
    class="min-w-full bg-white shadow-md rounded-lg border border-slate-200 border-collapse"
  >
    <thead>
      <tr>
        <th
          class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap"
        >
          ID товару
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap"
        >
          Назва
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap"
        >
          Ціна за одиницю
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap"
        >
          Кількість
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap"
        >
          Загальна вартість
        </th>
      </tr>
    </thead>
    <tr v-for="item in order.items" :key="item.id">
      <td class="px-6 py-4 border border-slate-200">
        {{ item.product.id }}
      </td>
      <td class="px-6 py-4 border border-slate-200">
        {{ item.product.name }}
      </td>
      <td class="px-6 py-4 border border-slate-200">{{ item.product.price }} ₴</td>
      <td class="px-6 py-4 border border-slate-200">
        {{ item.quantity }}
      </td>
      <td class="px-6 py-4 border border-slate-200">
        {{ item.quantity * item.product.price }} ₴
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useOrdersStore } from "~/store/ordersStore";
import type { IOrder, OrderStatus } from "~/store/types/order.types";
const ordersStore = useOrdersStore();
const { $toast } = useNuxtApp();

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const props = defineProps<{
  order: IOrder;
  orderStatusTranslations: Record<string, string>;
}>();

const updateOrderStatus = async (order: IOrder, newStatus: string) => {
  try {
    await ordersStore.updateOrderStatus(order.id, newStatus as OrderStatus);

    order.status = newStatus as OrderStatus;

    $toast.success("Статус замовлення оновлено");
    isOpen.value = false;
  } catch (error) {
    $toast.error(`Помилка при оновленні статусу замовлення, ${error}`);
    console.error("Update order status error:", error);
  }
};

const translateOrderStatus = (status: string): string => {
  return props.orderStatusTranslations[status] || status;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
