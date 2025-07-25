import { createSignal, createEffect } from "solid-js"

let hydrating = true

export function useHydrated() {
	const [hydrated, setHydrated] = createSignal(!hydrating)

	createEffect(() => {
		hydrating = false
		setHydrated(true)
	})

	return hydrated
}