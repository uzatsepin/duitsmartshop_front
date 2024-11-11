// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: 'static',
    output: {
      dir: '.output/public',
      publicDir: '.output/public'
    }
  },

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },
  image: {
    dir: 'public',
    staticFilename: '/[name][ext]',
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 80
        }
      }
    }
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/fonts",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "radix-vue/nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
    "vue3-carousel-nuxt",
    "vue-sonner/nuxt",
    "nuxt-tiptap-editor",
  ],

  runtimeConfig: {
    public: {
      apiBase: 'https://felearn.pro/api',
    }
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-04-03",

  tailwindcss: {
    viewer: false,
  },

  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
});