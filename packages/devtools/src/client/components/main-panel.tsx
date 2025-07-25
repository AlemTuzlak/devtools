import clsx from "clsx"
import { useSettingsContext } from "../context/use-devtools-shell-context"
import { useResize } from "../hooks/use-resize"

interface MainPanelProps {
	children: React.ReactNode
	isOpen: boolean

	className?: string
}

export const MainPanel = ({ children, isOpen, className }: MainPanelProps) => {
	const { settings } = useSettingsContext()
	const { panelLocation, height } = settings
	const { enableResize, disableResize, isResizing } = useResize()

	return (
		<div
			data-testid="tanstack-devtools-main-panel"
			style={{
				zIndex: 9998,
				height,
			}}
			className={clsx(
				"duration-600 box-border flex w-screen flex-col overflow-auto bg-main text-white opacity-0 transition-all",
				isOpen ? "opacity-100 drop-shadow-2xl" : "!h-0",
				isResizing && "cursor-grabbing",
				`fixed left-0 ${panelLocation === "bottom" ? "bottom-0" : "top-0 border-b-2 border-main"}`,
				className
			)}
		>
			{panelLocation === "bottom" && (
				<div
					onMouseDown={enableResize}
					onMouseUp={disableResize}
					className={clsx("absolute z-50 h-1 w-full", isResizing ? "cursor-grabbing" : "cursor-ns-resize")}
				/>
			)}
			{children}
			{panelLocation === "top" && (
				<div
					onMouseDown={enableResize}
					onMouseUp={disableResize}
					className={clsx("absolute bottom-0 z-50 h-1 w-full", isResizing ? "cursor-grabbing" : "cursor-ns-resize")}
				/>
			)}
		</div>
	)
}
