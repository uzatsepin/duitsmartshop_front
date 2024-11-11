<template>
  <div>
    <div
      v-for="(characteristic, index) in characteristics"
      :key="index"
      class="flex gap-4 mb-4"
    >
      <input
        v-model="characteristic.name"
        placeholder="Назва властивості"
        class="w-1/3 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
      />
      <input
        v-model="characteristic.value"
        placeholder="Значення"
        class="w-1/3 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
      />
      <Button variant="destructive" @click.prevent="removeCharacteristic(index)"
        >Видалити</Button
      >
    </div>
    <Button @click.prevent="addCharacteristic">Додати властивість</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  existingCharacteristics: { name: string; value: string }[];
}>();

const emit = defineEmits<{
  (e: "update:characteristics", characteristics: { name: string; value: string }[]): void;
}>();

const characteristics = ref<{ name: string; value: string }[]>([]);

const addCharacteristic = () => {
  characteristics.value.push({ name: "", value: "" });
};

const removeCharacteristic = (index: number) => {
  characteristics.value.splice(index, 1);
};

watch(
  characteristics,
  (newCharacteristics) => {
    emit("update:characteristics", newCharacteristics);
  },
  { deep: true }
);
</script>

<style scoped></style>
