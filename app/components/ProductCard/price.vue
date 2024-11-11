<template>
  <div class="mt-4 flex gap-12 items-center">
    <div class="">
      <div class="flex items-center gap-2">
        <p class="text-lg text-slate-500 line-through">{{ oldPrice }}₴</p>
        <p class="py-[1px] px-[4px] bg-red-100 text-red-600 text-sm font-bold rounded">
          -{{ discountPrice }}%
        </p>
      </div>
      <div>
        <p class="text-3xl mt-2 text-slate-800 font-bold">{{ price }}₴</p>
      </div>
    </div>
    <div class="flex gap-4">
      <Button class="py-4 px-8 text-md" @click="addToCart(productId)">
        <Icon name="uil:cart" class="w-7 h-7 mr-3" />
        Купить
      </Button>
      <Button variant="outline" class="py-4 px-8">Отримати консультацію</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  price: Number,
  oldPrice: Number,
  productId: Number,
});

const discountPrice = computed(() => {
  return Math.round(
    (((props.oldPrice ?? 0) - (props.price ?? 0)) / (props.oldPrice ?? 1)) * 100
  );
});

const { addToCart } = useCart();
</script>

<style scoped></style>
