<template>
  <section class="mt-12">
    <h2 class="font-bold text-slate-700 text-2xl">
      Інші товари з категорії <span class="text-slate-900">{{ props.categoryProducts[0]?.category?.name }}</span>
    </h2>
    
    <!-- Loader -->
    <div v-if="loading" class="py-8 flex justify-center">
      <Preloader />
    </div>
    
    <!-- Products -->
    <div v-else class="flex gap-6 overflow-x-scroll no-scrollbar py-8">
      <ProductItem 
        v-for="product in props.categoryProducts" 
        :key="product?.id"
        :product="product"
        class="min-w-[300px]"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IProduct } from '~/store/types/product.types';

const props = defineProps<{
  categoryProducts: IProduct[];
  loading: boolean;
}>();


</script>