<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-2">
      <UserStatusFilter
        v-for="(label, status) in orderStatusTranslations"
        :key="status"
        :orderName="label"
        :status="status"
        :isActive="selectedOrder === status"
        @update:status="updateSelectedOrder"
      />
    </div>
    <UserOrderItem :orders="filteredOrders" v-if="filteredOrders.length > 0" />
    <div v-else>
      <p class="font-bold text-center text-lg">Замовлень не знайдено</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useOrdersStore } from "~/store/ordersStore";

const ordersStore = useOrdersStore();
const selectedOrder = ref("all");

const orderStatusTranslations: Record<string, string> = {
  all: "Всі",
  new: "В очікуванні",
  confirmed: "Підтверджено",
  shipped: "Відправлено",
  delivered: "Доставлено",
  cancelled: "Скасовано",
};

const updateSelectedOrder = (status: string) => {
  selectedOrder.value = status;
};

const filteredOrders = computed(() => {
  if (selectedOrder.value === "all") {
    return ordersStore.orders;
  }
  return ordersStore.orders.filter((order) => order.status === selectedOrder.value);
});

onMounted(async () => {
  await ordersStore.fetchAllOrders();
});
</script>

<style scoped></style>
