import postcss from "rollup-plugin-postcss"
import tailwind from "tailwindcss"
import nesting from "tailwindcss/nesting"
import { defineConfig } from "tsdown"
import solid from "vite-plugin-solid"
import config from "./tailwind.config.js"
export default defineConfig({
	entry: ["src/index.ts"],
	sourcemap: true,
	dts: true,
	minify: false,
	plugins: [
		solid(),
		postcss({
			extensions: [".css"],
			extract: true,
			plugins: [tailwind(config), nesting()],
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		}) as any,
	],
	noExternal: ["solid-js"],
	format: ["esm", "cjs"],
	outDir: "dist",
	inputOptions: {
		jsx: "preserve",
	},
	outputOptions: {
		inlineDynamicImports: true,
	},
})
