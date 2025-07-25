import { tanstackViteConfig } from "@tanstack/config/vite"
import { defineConfig, mergeConfig } from "vite"
import solid from "vite-plugin-solid"

const config = defineConfig({
	plugins: [solid()],
})

export default mergeConfig(
	config,
	tanstackViteConfig({
		entry: "./src/index.ts",
		srcDir: "./src",
	})
)
