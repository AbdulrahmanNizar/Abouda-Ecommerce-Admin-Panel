import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";
import Overview from "@/views/Overview.vue";
import Categories from "@/views/Categories.vue";
import Sizes from "@/views/Sizes.vue";
import Colors from "@/views/Colors.vue";
import Products from "@/views/Products.vue";

const routes: Array<RouteRecordRaw> = [
  {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Overview",
    path: "/",
    component: Overview,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
  {
    name: "Categories",
    path: "/categories",
    component: Categories,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
  {
    name: "Sizes",
    path: "/sizes",
    component: Sizes,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
  {
    name: "Colors",
    path: "/colors",
    component: Colors,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
  {
    name: "Products",
    path: "/products",
    component: Products,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsToken == true) {
    next("/login");
  } else {
    next();
  }
});

export default router;
