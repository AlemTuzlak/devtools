import clsx from "clsx"
import { useRef } from "react"
import { useTabs } from "../hooks/use-tabs"

export const ContentPanel = () => {
	const ref = useRef<HTMLDivElement>(null)
	const { Component, activeTab } = useTabs()

	return (
		<div className="flex h-full w-full overflow-y-hidden">
			<div
				ref={ref}
				className={clsx(
					"z-20 h-full w-full  overflow-y-auto overflow-x-hidden bg-main  ",

					activeTab === "page" && "!pt-0"
				)}
			>
				{Component}
			</div>
		</div>
	)
}
