import { onCleanup } from "solid-js"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function debounce(func: (...args: any[]) => any, timeout = 300) {
	let timer: NodeJS.Timeout
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (...args: any[]) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			// @ts-expect-error
			func.apply(this, args)
		}, timeout)
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function createDebounce(callback: (...args: any[]) => void, delay = 300) {
	const debouncedFn = debounce(callback, delay)

	onCleanup(() => {
		// Clear any pending timeouts when component unmounts
	})

	return debouncedFn
}
