import clsx from "clsx"
import { JSX } from "solid-js"
import { useSettingsContext } from "../context/use-devtools-shell-context"
import { useResize } from "../hooks/use-resize"

interface MainPanelProps {
	children: JSX.Element
	isOpen: boolean
	class?: string
}

export const MainPanel = (props: MainPanelProps) => {
	const { settings } = useSettingsContext()
	const { enableResize, disableResize, isResizing } = useResize()

	return (
		<div
			data-testid="tanstack-devtools-main-panel"
			style={{
				"z-index": 9998,
				height: `${settings().height}px`,
			}}
			class={clsx(
				"duration-600 box-border flex w-screen flex-col overflow-auto bg-main text-white opacity-0 transition-all",
				props.isOpen ? "opacity-100 drop-shadow-2xl" : "!h-0",
				isResizing() && "cursor-grabbing",
				`fixed left-0 ${settings().panelLocation === "bottom" ? "bottom-0" : "top-0 border-b-2 border-main"}`,
				props.class
			)}
		>
			{settings().panelLocation === "bottom" && (
				<div
					onMouseDown={enableResize}
					onMouseUp={disableResize}
					class={clsx("absolute z-50 h-1 w-full", isResizing() ? "cursor-grabbing" : "cursor-ns-resize")}
				/>
			)}
			{props.children}
			{settings().panelLocation === "top" && (
				<div
					onMouseDown={enableResize}
					onMouseUp={disableResize}
					class={clsx("absolute bottom-0 z-50 h-1 w-full", isResizing() ? "cursor-grabbing" : "cursor-ns-resize")}
				/>
			)}
		</div>
	)
}