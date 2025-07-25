import { createSignal, onCleanup } from "solid-js"

function debounce(func: (...args: any[]) => any, timeout = 300) {
	let timer: NodeJS.Timeout
	return (...args: any[]) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

export function createDebounce(callback: (...args: any[]) => void, delay = 300) {
	const debouncedFn = debounce(callback, delay)
	
	onCleanup(() => {
		// Clear any pending timeouts when component unmounts
	})
	
	return debouncedFn
}