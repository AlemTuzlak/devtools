import { createSignal, onMount } from "solid-js"

let hydrating = true

export function createHydrated() {
	const [hydrated, setHydrated] = createSignal(!hydrating)

	onMount(() => {
		hydrating = false
		setHydrated(true)
	})

	return hydrated
}