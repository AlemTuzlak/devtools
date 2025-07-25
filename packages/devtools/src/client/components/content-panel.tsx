import clsx from "clsx"
import { useTabs } from "../hooks/use-tabs"

export const ContentPanel = () => {
	const { Component, activeTab } = useTabs()

	return (
		<div class="flex h-full w-full overflow-y-hidden">
			<div
				class={clsx(
					"z-20 h-full w-full overflow-y-auto overflow-x-hidden bg-main",
					activeTab() === "pages" && "!pt-0"
				)}
			>
				{Component()}
			</div>
		</div>
	)
}