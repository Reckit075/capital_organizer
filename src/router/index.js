import Vue from "vue";
import VueRouter from "vue-router";
import Authorisation from "../views/Authorisation.vue";

import App from "../App.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "/user/login",
        component: Authorisation,
      },
      {
        path: "/user/register",
        component: Authorisation,
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
