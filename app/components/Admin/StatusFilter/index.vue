<template>
  <button
    :class="[
      'flex items-center gap-2 bg-slate-200 px-6 py-2 w-fit rounded-2xl cursor-pointer border hover:bg-white transition-all duration-300',
      isActive ? 'bg-white border border-slate-300' : '',
    ]"
    @click="selectFilter"
  >
    {{ orderName }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  orderName: string;
  status: string;
  isActive: boolean;
}>();

const emit = defineEmits<{
  (e: "update:status", status: string): void;
}>();

const selectFilter = () => {
  emit("update:status", props.status);
};
</script>

<style scoped></style>
