<template>
  <header class="bg-white border-b border-slate-300">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <HeaderLogo />

      <!-- Navigation -->
      <HeaderMenu />

      <!-- User Actions -->
      <div class="flex items-center space-x-4">
        <HeaderSearchBar />

        <NuxtLink
          to="#"
          class="text-slate-600 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all duration-300"
        >
          <Icon name="mdi:heart" class="w-6 h-6" />
        </NuxtLink>
        <div
          class="text-slate-600 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all duration-300 relative cursor-pointer"
          :class="{ 'bg-slate-100 text-slate-800': cartPopup }"
          @click="openCartPopup"
        >
          <Icon name="uil:cart" class="w-6 h-6" />
          <span
            class="absolute -top-1 -right-1 bg-red-600 text-slate-100 text-sm rounded-full w-5 h-5 flex items-center justify-center"
            v-if="getUserCart?.totalItems"
            >{{ getUserCart?.totalItems }}</span
          >
        </div>
        <div
          @click="isLoggedIn ? openProfilePopup() : openAuthPopup()"
          to="#"
          class="text-slate-600 cursor-pointer"
        >
          <template v-if="!isLoggedIn">
            <div
              class="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-all duration-300"
            >
              <Icon name="material-symbols:person-outline-rounded" class="w-6 h-6" />
            </div>
          </template>
          <template v-else>
            <Avatar class="w-10 h-10">
              <AvatarFallback
                >{{ userData?.username[0]?.toUpperCase()
                }}{{ userData?.username[1]?.toUpperCase() }}</AvatarFallback
              >
            </Avatar>
          </template>
        </div>
      </div>
      <!-- AUTH -->
      <Transition name="popup">
        <PopupCenter @close="closeAuthPopup" v-if="isAuthMenuVisible">
          <template #title>
            {{ isLoginForm ? "Авторизація" : "Реєстрація" }}
          </template>
          <template #default>
            <div class="flex flex-col gap-4">
              <template v-if="isLoginForm">
                <div class="relative">
                  <input
                    id="email"
                    type="text"
                    placeholder=" "
                    class="peer w-full h-14 px-4 pt-4 pb-1 rounded-2xl border border-transparent hover:border-slate-300 focus:border-slate-600 outline-none transition-all"
                    v-model="emailRef"
                  />
                  <label
                    for="email"
                    class="absolute left-4 top-3.5 text-gray-500 transition-all duration-200 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Електрона пошта
                  </label>
                </div>
                <div class="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder=""
                    class="peer w-full h-14 px-4 pt-4 pb-1 rounded-2xl border border-transparent hover:border-slate-300 focus:border-slate-600 outline-none transition-all"
                    v-model="passwordRef"
                  />
                  <label
                    for="password"
                    class="absolute left-4 top-3.5 text-gray-500 transition-all duration-200 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Пароль
                  </label>
                </div>
                <Button
                  class="rounded-2xl py-6"
                  @click="handleLogin(emailRef, passwordRef)"
                >
                  <template v-if="isLoading">
                    <Icon name="svg-spinners:90-ring-with-bg" class="w-7 h-7" />
                  </template>
                  <template v-else> Увійти </template>
                </Button>
                <p
                  class="text-sm text-center text-slate-500 cursor-pointer hover:text-slate-700 transition-colors duration-300"
                  @click="toggleForm"
                >
                  Ще немає аккаунту?
                </p>
              </template>
              <template v-else>
                <div class="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder=" "
                    class="peer w-full h-14 px-4 pt-4 pb-1 rounded-2xl border border-transparent hover:border-slate-300 focus:border-slate-600 outline-none transition-all"
                    v-model="nameRef"
                  />
                  <label
                    for="name"
                    class="absolute left-4 top-3.5 text-gray-500 transition-all duration-200 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Імʼя
                  </label>
                </div>
                <div class="relative">
                  <input
                    id="email"
                    type="text"
                    placeholder=" "
                    class="peer w-full h-14 px-4 pt-4 pb-1 rounded-2xl border border-transparent hover:border-slate-300 focus:border-slate-600 outline-none transition-all"
                    v-model="emailRef"
                  />
                  <label
                    for="email"
                    class="absolute left-4 top-3.5 text-gray-500 transition-all duration-200 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Електрона пошта
                  </label>
                </div>
                <div class="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder=" "
                    class="peer w-full h-14 px-4 pt-4 pb-1 rounded-2xl border border-transparent hover:border-slate-300 focus:border-slate-600 outline-none transition-all"
                    v-model="passwordRef"
                  />
                  <label
                    for="password"
                    class="absolute left-4 top-3.5 text-gray-500 transition-all duration-200 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Пароль
                  </label>
                </div>
                <Button
                  class="rounded-2xl py-6"
                  @click="handleRegister(nameRef, emailRef, passwordRef)"
                >
                  <template v-if="isLoading">
                    <Icon name="svg-spinners:90-ring-with-bg" class="w-7 h-7" />
                  </template>
                  <template v-else> Зареєструватися </template>
                </Button>
                <p
                  class="text-sm text-center text-slate-500 cursor-pointer hover:text-slate-700 transition-colors duration-300"
                  @click="toggleForm"
                >
                  Вже є аккаунт? Авторизуйся
                </p>
              </template>
            </div>
          </template>
        </PopupCenter>
      </Transition>
      <!-- PROFILE -->
      <Transition name="popup">
        <PopupTop v-if="profilePopup" @close="closeProfilePopup">
          <div class="py-2">
            <div class="flex items-center gap-4 px-4 py-2 border-b border-slate-200">
              <Avatar class="w-8 h-8">
                <AvatarFallback
                  >{{ userData?.username[0]?.toUpperCase()
                  }}{{ userData?.username[1]?.toUpperCase() }}</AvatarFallback
                >
              </Avatar>
              <div>
                <p class="text-md font-semibold text-slate-800">
                  {{ userData?.username }}
                </p>
                <p class="text-sm text-slate-500">{{ userData?.email }}</p>
              </div>
            </div>
            <div class="mt-4 flex flex-col">
              <NuxtLink
                to="/admin/add"
                class="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors duration-300"
                v-if="userData?.role.name === 'Admin'"
              >
                <Icon name="ri:admin-fill" class="w-6 h-6 text-slate-600" />
                Адмін панель
              </NuxtLink>
              <NuxtLink
                :to="
                  userData?.role.name === 'Admin' ? '/admin/orders' : '/cabinet/orders'
                "
                class="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors duration-300"
              >
                <Icon name="uil:cart" class="w-6 h-6 text-slate-600" />
                Мої замовлення
              </NuxtLink>
              <NuxtLink
                to="/profile"
                class="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors duration-300"
              >
                <Icon name="mdi:heart" class="w-6 h-6 text-slate-600" />
                Список бажань
              </NuxtLink>
              <NuxtLink
                :to="
                  userData?.role.name === 'Admin' ? '/admin/reviews' : '/cabinet/reviews'
                "
                class="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors duration-300"
              >
                <Icon name="lets-icons:comment" class="w-6 h-6 text-slate-600" />
                Мої відгуки
              </NuxtLink>

              <div
                class="flex items-center gap-2 cursor-pointer px-6 py-3 text-red-600 hover:text-red-800 hover:bg-red-100 transition-colors duration-300"
                @click="handleLogout"
              >
                <Icon name="material-symbols:logout" class="w-6 h-6" />
                Вихід
              </div>
            </div>
          </div>
        </PopupTop>
      </Transition>

      <Transition name="popup">
        <PopupCart v-if="cartPopup" @close="closeCartPopup">
          <div>
            <div
              class="flex items-center justify-between px-4 py-4 border-b border-slate-200"
            >
              <h3 class="text-lg font-semibold text-slate-800">Твій кошик</h3>
              <Icon
                name="iconamoon:close"
                class="w-6 h-6 cursor-pointer"
                @click="closeCartPopup"
              />
            </div>
          </div>
          <div class="p-4" v-if="getUserCart?.cartItems.length">
            <div class="flex flex-col gap-4">
              <CartProduct
                v-for="(item, idx) in getUserCart?.cartItems"
                :key="idx"
                :cartItem="item"
                @update="(quantity) => updateCartItemQuantity(item.id, quantity)"
                @remove="removeFromCart(item.id)"
              />
            </div>
            <div class="pt-4 mt-4 border-t border-slate-300">
              <div class="flex items-center justify-between">
                <p class="text-slate">Всього:</p>
                <p class="text-slate font-bold">{{ getUserCart?.totalSum }} ₴</p>
              </div>
            </div>
            <div class="p-4">
              <Button class="w-full rounded-2xl py-6" @click="createOrder"
                >Оформити замовлення</Button
              >
            </div>
          </div>
          <div class="p-4" v-else>
            <p class="text-center text-slate-500">Кошик порожній</p>
          </div>
        </PopupCart>
      </Transition>
      <!-- CREATE ORDER -->
      <Transition
        name="popup"
        v-if="successOrderPopup"
        @close="successOrderPopup = false"
      >
        <PopupCenter class="w-[700px]">
          <template #title>
            <h2 class="font-bold text-lg">
              Замовлення {{ successOrderData?.id }} успішно оформлене
            </h2>
          </template>
          <template #default>
            <div>
              <table
                class="min-w-full bg-white shadow-md rounded-lg border border-slate-200 border-collapse"
              >
                <tbody>
                  <tr>
                    <td class="px-6 py-4 border border-slate-200 font-bold">
                      Номер замовлення
                    </td>
                    <td class="px-6 py-4 border border-slate-200">
                      {{ successOrderData?.id }}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 border border-slate-200 font-bold">
                      Дата замовлення
                    </td>
                    <td class="px-6 py-4 border border-slate-200">
                      {{ dayjs(successOrderData?.orderDate).format("DD-MM-YY HH:mm") }}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 border border-slate-200 font-bold">
                      Сума замовлення
                    </td>
                    <td class="px-6 py-4 border border-slate-200">
                      {{ successOrderData?.totalAmount }} ₴
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 class="my-6 font-bold text-lg">Товари в замовленні:</h3>
              <table
                class="min-w-full bg-white shadow-md rounded-lg border border-slate-200 border-collapse"
              >
                <thead>
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap font-bold"
                    >
                      Назва товару
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap font-bold"
                    >
                      Кількість
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap font-bold"
                    >
                      Ціна за одиницю
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in successOrderData?.items" :key="item.product.id">
                    <td class="px-6 py-4 border border-slate-200">
                      {{ item.product.name }}
                    </td>
                    <td class="px-6 py-4 border border-slate-200">
                      {{ item.quantity }} шт.
                    </td>
                    <td class="px-6 py-4 border border-slate-200">
                      {{ item.product.price }} ₴
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mt-4 text-slate-500">
              Дякую вам за замовлення! Менеджер звʼяжеться з вами найближчим часом!
            </p>
          </template>
        </PopupCenter>
      </Transition>
    </div>
    <client-only>
      <Toaster position="bottom-right" />
    </client-only>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/authStore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useCartStore } from "~/store/cartStore";
import { useOrdersStore } from "~/store/ordersStore";
import type { IOrder } from "~/store/types/order.types";
import dayjs from "dayjs";
const authStore = useAuthStore();
const { register, login, logout, isLoggedIn, isLoading, userData } = authStore;
const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");
const isLoginForm = ref(true);
const { $toast } = useNuxtApp();
const isAuthMenuVisible = computed(() => authStore.isAuthMenuVisible);
const profilePopup = ref(false);
const cartPopup = ref(false);
const config = useRuntimeConfig();
const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const successOrderPopup = ref(false);
const successOrderData = ref<IOrder>();

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
};
const closeAuthPopup = () => {
  authStore.authMenuClose();
};
const openAuthPopup = () => {
  authStore.authMenuOpen();
};

const closeProfilePopup = () => {
  profilePopup.value = false;
};

const openProfilePopup = () => {
  profilePopup.value = true;
};

const openCartPopup = async () => {
  cartPopup.value = true;

  if (!cartStore.userCart?.cartItems.length) {
    await cartStore.fetchCart();
  }
};

const closeCartPopup = () => {
  cartPopup.value = false;
};

const handleRegister = async (name: string, email: string, password: string) => {
  await register(name, email, password);

  if (!authStore.errorMessage) {
    $toast.success("Реєстрація успішна!");

    setTimeout(() => {
      authStore.authMenuClose();
      window.location.reload();
    }, 500);

    emailRef.value = "";
    passwordRef.value = "";
    nameRef.value = "";
  } else {
    $toast.error(authStore.errorMessage);
  }
};

const handleLogin = async (email: string, password: string) => {
  await login(email, password);

  if (!authStore.errorMessage) {
    $toast.success("Авторизація успішна!");
    setTimeout(() => {
      authStore.authMenuClose();
      window.location.reload();
    }, 500);

    emailRef.value = "";
    passwordRef.value = "";
  } else {
    $toast.error(authStore.errorMessage);
  }
};

const handleLogout = async () => {
  await logout();

  if (!authStore.errorMessage) {
    $toast.success("Вихід успішний!");
    setTimeout(() => {
      profilePopup.value = false;
      window.location.reload();
    }, 1000);
  } else {
    $toast.error(authStore.errorMessage);
  }
};

const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
  try {
    await $fetch(`${config.public.apiBase}/cart/item/${cartItemId}`, {
      method: "PUT",
      body: { quantity },
      headers: {
        Authorization: `Bearer ${useCookie("auth_token").value}`,
      },
    });

    await cartStore.fetchCart();
  } catch (error) {
    console.error("Error updating quantity:", error);
    $toast.error("Помилка при оновленні кількості");
  }
};

const removeFromCart = async (cartItemId: number) => {
  try {
    await $fetch(`${config.public.apiBase}/cart/item/${cartItemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useCookie("auth_token").value}`,
      },
    });

    await cartStore.fetchCart();
    $toast.success("Товар видалено з кошика");
  } catch (error) {
    console.error("Error removing item:", error);
    $toast.error("Помилка при видаленні товару");
  }
};

const createOrder = async () => {
  if (getUserCart.value?.totalSum !== undefined) {
    const response = await ordersStore.createOrder(
      getUserCart.value.totalSum,
      getUserCart.value.cartItems
    );
    if (response) {
      cartStore.userCart = {
        totalItems: 0,
        totalSum: 0,
        cartItems: [],
      };
      await cartStore.clearCart();
      successOrderPopup.value = true;
      successOrderData.value = response;
      closeCartPopup();
    } else {
      $toast.error("Не вдалося створити замовлення");
    }
  } else {
    $toast.error("Загальна сума не вказана");
  }
};

const getUserCart = computed(() => cartStore.userCart);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
