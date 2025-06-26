import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import Modules from "vite-plugin-use-modules";

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	base: './',
	plugins: [
		vue(),
		Pages(),
		Unocss(),
		Components({
			dts: "types/generated/components.d.ts",
			dirs: ['src/stores', 'src/composables', 'src/hooks', 'src/pages'],
		}),
		Modules({
			auto: true,
		}),
		AutoImport({
			dts: "types/generated/auto-imports.d.ts",
			imports: ["vue", "vue-router"],
		}),
	],
});
