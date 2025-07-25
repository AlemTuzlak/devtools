import { createSignal, createEffect, onCleanup } from "solid-js"

// biome-ignore lint/suspicious/noExplicitAny: we don't care about types here
function debounce(func: (...args: any[]) => any, timeout = 300) {
	let timer: NodeJS.Timeout
	// biome-ignore lint/suspicious/noExplicitAny: we don't care about types here
	return (...args: any[]) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

// biome-ignore lint/suspicious/noExplicitAny: we don't care about types here
export function useDebounce(callback: (...args: any[]) => void, delay = 300) {
	const [debouncedCallback] = createSignal(debounce(callback, delay))
	return debouncedCallback()
}