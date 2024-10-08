import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";
import Overview from "@/views/Overview.vue";
import Categories from "@/views/Categories.vue";
import Sizes from "@/views/Sizes.vue";
import Colors from "@/views/Colors.vue";
import Products from "@/views/Products.vue";
import CreateProduct from "@/views/CreateProduct.vue";
import UpdateProduct from "@/views/UpdateProduct.vue";
import Orders from "@/views/Orders.vue";
import OrderDetails from "@/views/OrderDetails.vue";
import CreateStore from "@/views/CreateStore.vue";

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
  {
    name: "CreateProducts",
    path: "/createProduct",
    component: CreateProduct,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
  {
    name: "UpdateProduct",
    path: "/updateProduct/:productId",
    component: UpdateProduct,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
  {
    name: "Orders",
    path: "/orders",
    component: Orders,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
  {
    name: "OrderDetails",
    path: "/orderDetails/:orderId",
    component: OrderDetails,
    meta: {
      needsToken: localStorage.getItem("JwtToken") ? false : true,
    },
  },
  {
    name: "CreateStore",
    path: "/createStore",
    component: CreateStore,
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
