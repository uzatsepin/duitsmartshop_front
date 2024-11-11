import type { IUser } from "./types/user.types";
import { useCookie } from "#app";

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const authToken = useCookie('auth_token', { maxAge: 86400 });
  const isLoading = ref(false);
  const errorMessage = ref('');
  const isAuthMenuVisible = ref(false);
  
  const userData = useCookie<IUser | null>('user_data', { maxAge: 86400 });

  const register = async (username: string, email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = '';
    try {
      const config = useRuntimeConfig();
      const data: { token?: string; user:IUser } = await $fetch(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        body: { username, email, password, roleId: 2 },
      });
      if (data.token) {
        authToken.value = data.token;
        isLoggedIn.value = true;
        userData.value = data.user
      }
    } catch (error: any) {
      errorMessage.value = error?.data?.message || 'Ошибка при регистрации';
      console.error('Ошибка при регистрации:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = '';
    try {
      const config = useRuntimeConfig();
      const data: { token: string; user: IUser } = await $fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: { email, password },
      });
      
      if (data.token) {
        authToken.value = data.token;
        isLoggedIn.value = true;
        userData.value = data.user;
      }
    } catch (error: any) {
      errorMessage.value = error?.data?.message || 'Ошибка при авторизации';
      console.error('Ошибка при авторизации:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    authToken.value = null;
    isLoggedIn.value = false;
    errorMessage.value = '';
    userData.value = null;
  };

  const checkAuth = () => {
    isLoggedIn.value = Boolean(authToken.value);
  };

  const authMenuOpen = () => {
    isAuthMenuVisible.value = !isAuthMenuVisible.value;
  }

  const authMenuClose = () => {
    isAuthMenuVisible.value = false
  }

  checkAuth();

  return {
    isLoggedIn,
    isLoading,
    errorMessage,
    register,
    login,
    logout,
    checkAuth,
    userData,
    isAuthMenuVisible,
    authMenuOpen,
    authMenuClose
  };
});
