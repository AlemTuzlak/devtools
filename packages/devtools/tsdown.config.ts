import postcss from "rollup-plugin-postcss"
import tailwind from "tailwindcss"
import nesting from "tailwindcss/nesting"
import { defineConfig } from "tsdown"
import config from "./tailwind.config.js"

export default defineConfig({
	entry: ["src/index.ts"],
	sourcemap: true,
	dts: true,
	minify: false,
	plugins: [
		postcss({
			extensions: [".css"],
			extract: true,
			plugins: [tailwind(config), nesting()],
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		}) as any,
	],
	format: ["esm", "cjs"],
	outDir: "dist",
})
