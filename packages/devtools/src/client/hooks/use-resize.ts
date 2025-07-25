import { createSignal, createEffect, onCleanup } from "solid-js"
import { useSettingsContext } from "../context/use-devtools-shell-context"

const createResize = () => {
	const { setSettings, settings } = useSettingsContext()
	const [isResizing, setIsResizing] = createSignal(false)

	const enableResize = () => {
		setIsResizing(true)
	}

	const disableResize = () => {
		setIsResizing(false)
	}

	const resize = (e: MouseEvent) => {
		if (isResizing()) {
			window.getSelection()?.removeAllRanges() // Prevent text selection
			const { height, maxHeight, minHeight, panelLocation } = settings()
			const newHeight = panelLocation === "top" ? e.clientY : window.innerHeight - e.clientY

			if (newHeight > maxHeight) {
				setSettings({ height: maxHeight })
				return
			}

			if (newHeight < minHeight) {
				setSettings({ height: minHeight })
				return
			}

			setSettings({ height: newHeight })
		}
	}

	createEffect(() => {
		if (isResizing()) {
			document.addEventListener("mousemove", resize)
			document.addEventListener("mouseup", disableResize)
		}
	})

	onCleanup(() => {
		document.removeEventListener("mousemove", resize)
		document.removeEventListener("mouseup", disableResize)
	})

	return { height: () => settings().height, enableResize, disableResize, isResizing }
}

export { createResize }