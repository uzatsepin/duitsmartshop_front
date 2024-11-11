import { useAuthStore } from "~/store/authStore"

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
  
    if (!auth.isLoggedIn) {
      return navigateTo('/login')
    }
  
    if (auth.userData?.role.name !== 'Admin') {
      return navigateTo('/')
    }
  })