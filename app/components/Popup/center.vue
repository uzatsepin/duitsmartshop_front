<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-md z-[999] flex items-center justify-center"
    @click="closeModal"
  >
    <div
      :class="cn('absolute w-[350px] bg-slate-100 rounded-lg shadow-lg', props.class)"
      @click.stop
    >
      <div class="p-6">
        <div class="flex justify-between items-center">
          <h3 class="font-semibold text-slate-600 font-md">
            <slot name="title" />
          </h3>
          <Icon
            name="iconamoon:close"
            class="w-6 h-6 cursor-pointer"
            @click="closeModal"
          />
        </div>
        <div class="mt-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "#imports";

const props = defineProps<{
  class?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const closeModal = () => {
  emit("close");
};
</script>

<style scoped></style>
