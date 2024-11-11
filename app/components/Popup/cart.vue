<template>
  <div
    class="fixed top-[96px] left-0 right-0 bottom-0 bg-black/50 backdrop-blur-md z-[999]"
    @click="closeModal"
  >
    <div
      class="absolute top-2 right-24 w-[440px] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      @click.stop
    >
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void;
}>();

const closeModal = () => {
  emit("close");
};
</script>

<style scoped></style>
