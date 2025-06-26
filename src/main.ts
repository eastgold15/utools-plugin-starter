import { createApp } from "vue";
import App from "./App.vue";
import "modern-css-reset";
import "@/assets/style/main.css"

import "virtual:uno.css";

const app = createApp(App);

app.mount("#app");
