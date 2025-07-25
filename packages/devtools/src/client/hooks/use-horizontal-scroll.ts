import { createSignal, createEffect, onCleanup } from "solid-js"

export const useHorizontalScroll = () => {
	const [ref, setRef] = createSignal<HTMLDivElement | null>(null)

	createEffect(() => {
		const elem = ref()
		if (!elem) return

		const onWheel = (ev: WheelEvent) => {
			if (!elem || ev.deltaY === 0) return

			elem.scrollTo({
				left: elem.scrollLeft + ev.deltaY,
				behavior: "smooth",
			})
		}

		elem.addEventListener("wheel", onWheel, { passive: true })

		onCleanup(() => {
			elem.removeEventListener("wheel", onWheel)
		})
	})

	return setRef
}