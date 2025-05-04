import type { RouterConfig } from "@nuxt/schema";

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: "home",
      path: "/",
      component: () => import("~/pages/dashboard.vue"),
    },
    {
      name: "Login",
      path: "/sign-in",
      component: () => import("~/pages/sign-in.vue"),
    },
    {
      name: "create account",
      path: "/sign-up",
      component: () => import("~/pages/sign-up.vue"),
    },
  ],
} satisfies RouterConfig;
