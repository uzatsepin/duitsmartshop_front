import type { ICart } from "./types/cart.types";

export const useCartStore = defineStore('cart', () => {
  const config = useRuntimeConfig();
  const userCart = ref<ICart>();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const totalItems = computed(() => userCart.value?.cartItems.length || 0);
  const totalSum = computed(() => 
    userCart.value?.cartItems.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    )
  );

  const fetchCart = async () => {
    try {
      loading.value = true;
    const response = await $fetch<ICart>(`${config.public.apiBase}/cart`, {
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    });
    userCart.value = response;
    } catch (err) {
      console.error('Error fetching cart:', err);
      error.value = 'Failed to fetch cart';
    } finally {
      loading.value = false;
    }
  };

  if (useCookie('auth_token').value) {
    fetchCart();
  }

  const clearCart = async () => {
    try {
      await $fetch(`${config.public.apiBase}/cart/clear`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('auth_token').value}`,
        },
      });
      userCart.value = { cartItems: [], totalItems: 0, totalSum: 0 };
    } catch (err) {
      console.error('Error clearing cart:', err);
      error.value = 'Не удалось очистить корзину';
    }
  };

  return {
    userCart,
    loading,
    error,
    totalItems,
    totalSum,
    fetchCart,
    clearCart
  };
});