import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";
import Overview from "@/views/Overview.vue";

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
    name: "Home",
    path: "/",
    component: Overview,
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
