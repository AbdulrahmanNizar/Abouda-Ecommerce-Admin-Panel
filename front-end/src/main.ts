import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(store).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js";
