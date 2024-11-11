<template>
  <div class="overflow-x-auto">
    <table
      class="min-w-full bg-white shadow-md rounded-lg border border-slate-200 border-collapse"
    >
      <thead class="bg-slate-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap"
          >
            # замовлення
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
          >
            Товар
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
          >
            Кількість товарів
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap"
          >
            Сума
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
          >
            Дата
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border border-slate-200"
          >
            Статус
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="hover:bg-slate-50">
          <td class="px-6 py-4 border border-slate-200"># {{ order.id }}</td>
          <td class="px-6 py-4 border border-slate-200">
            {{ order.items.map((item) => item.product.name)[0] }}
          </td>
          <td class="px-6 py-4 border border-slate-200">{{ order.items.length }}</td>
          <td class="px-6 py-4 border border-slate-200 whitespace-nowrap">
            {{ order.totalAmount }} ₴
          </td>
          <td class="px-6 py-4 border border-slate-200 whitespace-nowrap">
            <time>{{ dayjs(order.orderDate).format("DD-MM-YY – HH:mm") }}</time>
          </td>
          <td
            class="px-6 py-4 border border-slate-200 whitespace-nowrap text-center"
            :class="{
              'text-blue-500 bg-blue-100': order.status === 'new',
              'text-yellow-500 bg-yellow-100': order.status === 'confirmed',
              'text-green-500 bg-green-100': order.status === 'delivered',
              'text-orange-500 bg-orange-100': order.status === 'shipped',
              'text-red-500 bg-red-100': order.status === 'cancelled',
            }"
          >
            {{ translateOrderStatus(order.status) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { IOrder } from "~/store/types/order.types";

defineProps<{
  orders: IOrder[];
}>();

const orderStatusTranslations: Record<string, string> = {
  new: "В очікуванні",
  confirmed: "Підтверджено",
  shipped: "Відправлено",
  delivered: "Доставлено",
  cancelled: "Скасовано",
};

const translateOrderStatus = (status: string): string => {
  return orderStatusTranslations[status] || status;
};
</script>

<style scoped></style>
