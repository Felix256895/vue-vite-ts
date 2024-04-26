import { createApp } from "vue";
import App from "./App.vue";

import { setupStore } from "@/store";
import router from "@/router";
import i18n from "@/locales";

import "element-plus/theme-chalk/dark/css-vars.css";
import "virtual:svg-icons-register";
import "@/styles/index.scss";

const app = createApp(App);

setupStore(app);
app.use(i18n);
app.use(router).mount("#app");
