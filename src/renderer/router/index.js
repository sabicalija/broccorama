import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Recipe from "../views/Recipe.vue";
import GlobalUI from "../views/GlobalUI.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/recipe",
    name: "recipe",
    component: Recipe
  },
  {
    path: "/global-ui",
    name: "global-ui",
    component: GlobalUI
  }
];

const router = new VueRouter({
  base: "/",
  routes
});

export default router;
