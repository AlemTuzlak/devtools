import { createSignal, createEffect, onCleanup } from "solid-js"
import { useSettingsContext } from "../context/use-devtools-shell-context"

const useResize = () => {
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
			const newHeight = settings().panelLocation === "top" ? e.clientY : window.innerHeight - e.clientY

			if (newHeight > settings().maxHeight) {
				setSettings({ height: settings().maxHeight })
				return
			}

			if (newHeight < settings().minHeight) {
				setSettings({ height: settings().minHeight })
				return
			}

			setSettings({ height: newHeight })
		}
	}

	createEffect(() => {
		document.addEventListener("mousemove", resize)
		document.addEventListener("mouseup", disableResize)

		onCleanup(() => {
			document.removeEventListener("mousemove", resize)
			document.removeEventListener("mouseup", disableResize)
		})
	})

	return { enableResize, disableResize, isResizing }
}

export { useResize }