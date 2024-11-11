import type { IOrder, OrderStatus } from "./types/order.types";

export const useOrdersStore = defineStore("orders", () => {
  const config = useRuntimeConfig();
  const orders = ref<IOrder[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAllOrders = async () => {
    try {
      loading.value = true;
      const response = await $fetch<IOrder[]>(`${config.public.apiBase}/order`, {
        headers: {
          Authorization: `Bearer ${useCookie("auth_token").value}`,
        },
      });
      orders.value = response;
    } catch (err) {
      console.error("Error fetching orders:", err);
      error.value = "Failed to fetch orders";
    } finally {
      loading.value = false;
    }
  };

  const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
    try {
      await $fetch(`${config.public.apiBase}/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${useCookie("auth_token").value}`,
          'Content-Type': 'application/json',
        },
        body: { status },
      });
      const order = orders.value.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };


  const createOrder = async (totalAmount: number, items:any) => {
    try {
      loading.value = true;
      interface ICreateOrderItem {
        productId: number;
        quantity: number;
      }

      interface ICreateOrderBody {
        totalAmount: number;
        items: ICreateOrderItem[];
      }

      const response = await $fetch<IOrder>(`${config.public.apiBase}/order`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useCookie("auth_token").value}`,
          'Content-Type': 'application/json',
        },
        body: {
          totalAmount,
          items: items.map((item: { product: { id: number }; quantity: number }): ICreateOrderItem => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        } as ICreateOrderBody,
      });
      orders.value.push(response);
      return response;
    } catch (err) {
      console.error('Error creating order:', err);
      error.value = 'Не вдалося створити замовлення';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchAllOrders,
    orders,
    updateOrderStatus,
    createOrder
  };
});