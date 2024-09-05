// https://nuxt.com/docs/api/configuration/nuxt-config
import nitroPublic from "nitro-public-module";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@ant-design-vue/nuxt"],
  compatibilityDate: "2024-07-03",
  ssr: false,
  nitro: {
    modules: [nitroPublic()],
  }
})