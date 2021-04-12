import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const UserRouter = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "/panel",
        component: () => import("../views/PanelView.vue"),
        meta: {
          title: "Panel",
        },
      },
      {
        path: "/stats",
        component: () => import("../views/StatsView.vue"),
        meta: {
          title: "Stats",
        },
      },
      {
        path: "/auth/login",
        component: () => import("../views/Auth/Login.vue"),
        meta: {
          title: "Login",
        },
      },
      {
        path: "/auth/register",
        component: () => import("../views/Auth/Register.vue"),
        meta: {
          title: "Register",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...UserRouter],
});

export default router;
