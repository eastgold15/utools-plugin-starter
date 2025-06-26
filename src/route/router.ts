import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

export const router = createRouter({
	routes,
	history: createWebHistory(),
});

export default (app: App): App => app.use(router);
