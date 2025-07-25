import { onMount, onCleanup } from "solid-js"

export const useHorizontalScroll = () => {
	let ref: HTMLDivElement | undefined

	onMount(() => {
		const elem = ref
		const onWheel = (ev: WheelEvent) => {
			if (!elem || ev.deltaY === 0) return

			elem.scrollTo({
				left: elem.scrollLeft + ev.deltaY,
				behavior: "smooth",
			})
		}

		elem?.addEventListener("wheel", onWheel, { passive: true })

		onCleanup(() => {
			elem?.removeEventListener("wheel", onWheel)
		})
	})

	return ref
}