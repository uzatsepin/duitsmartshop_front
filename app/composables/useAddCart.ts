import { useCartStore } from '~/store/cartStore';
import { useNuxtApp, useRuntimeConfig, useCookie } from '#app';
import { useAuthStore } from '~/store/authStore';

export const useCart = () => {
  const cartStore = useCartStore();
  const config = useRuntimeConfig();
  const { $toast } = useNuxtApp();

  const addToCart = async (productId: number | undefined, quantity: number = 1) => {
    try {
      const response = await $fetch(`${config.public.apiBase}/cart/add`, {
        method: 'POST',
        body: {
          productId,
          quantity
        },
        headers: {
          'Authorization': `Bearer ${useCookie('auth_token').value}`
        }
      });

      if (response) {
        $toast.success('Товар додано до кошика');
        await cartStore.fetchCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      $toast.error('Помилка при додаванні товару до кошика');
    }
  };

  return {
    addToCart
  };
};