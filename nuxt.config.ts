// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  app: {
    head: {
      title: "Storage",
      charset: "utf-16",

      htmlAttrs: { lang: "pt-br" },
    },
  },
  css: ["./assets/css/main.css"],
});
