import { createEffect, For, Show } from "solid-js"
import { usePlugins } from "../context/use-devtools-shell-context"

export const PagesTab = () => {
	const { plugins, setActivePlugin, activePlugin } = usePlugins()
	let ref: HTMLDivElement | undefined

	createEffect(() => {
		if (activePlugin() && ref) {
			activePlugin()!.component(ref)
		}
	})

	return (
		<div class="flex h-full w-full">
			<div class="w-48 h-full border-r border-gray-200">
				<div class="flex flex-col h-full">
					<div class="flex-1">
						<For each={plugins()}>
							{(plugin) => (
								<button
									type="button"
									onClick={() => setActivePlugin(plugin)}
									class={`w-full px-4 py-3 text-left text-sm font-medium border-b border-gray-100 transition-colors ${
										activePlugin()?.id === plugin.id
											? "bg-blue-50 text-blue-700 border-r-2 border-r-blue-500"
											: "text-white"
									}`}
								>
									{plugin.name}
								</button>
							)}
						</For>
					</div>
				</div>
			</div>
			<div class="w-full h-full overflow-y-auto first:h-full" ref={ref} />
		</div>
	)
}