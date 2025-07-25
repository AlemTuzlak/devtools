import { Show } from "solid-js"
import { useSettingsContext } from "../context/use-devtools-shell-context"
import { createResize } from "../hooks/use-resize"

interface MainPanelProps {
	children: any
	isOpen: boolean
	class?: string
}

export const MainPanel = (props: MainPanelProps) => {
	const { settings } = useSettingsContext()
	const { enableResize, disableResize, isResizing } = createResize()

	const panelClasses = () => {
		const { panelLocation, height } = settings()
		return {
			height: `${height}px`,
			"z-index": 9998,
		}
	}

	const positionClasses = () => {
		const panelLocation = settings().panelLocation
		return `fixed left-0 ${panelLocation === "bottom" ? "bottom-0" : "top-0 border-b-2 border-main"}`
	}

	return (
		<div
			data-testid="tanstack-devtools-main-panel"
			style={panelClasses()}
			class={`duration-600 box-border flex w-screen flex-col overflow-auto bg-main text-white transition-all ${
				props.isOpen ? "opacity-100 drop-shadow-2xl" : "!h-0 opacity-0"
			} ${isResizing() ? "cursor-grabbing" : ""} ${positionClasses()} ${props.class || ""}`}
		>
			<Show when={settings().panelLocation === "bottom"}>
				<div
					onMouseDown={enableResize}
					onMouseUp={disableResize}
					class={`absolute z-50 h-1 w-full ${isResizing() ? "cursor-grabbing" : "cursor-ns-resize"}`}
				/>
			</Show>
			{props.children}
			<Show when={settings().panelLocation === "top"}>
				<div
					onMouseDown={enableResize}
					onMouseUp={disableResize}
					class={`absolute bottom-0 z-50 h-1 w-full ${isResizing() ? "cursor-grabbing" : "cursor-ns-resize"}`}
				/>
			</Show>
		</div>
	)
}