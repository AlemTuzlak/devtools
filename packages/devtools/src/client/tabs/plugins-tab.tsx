import { useEffect, useRef } from "react"
import { usePlugins } from "../context/use-devtools-shell-context"

export const PagesTab = () => {
	const { plugins, setActivePlugin, activePlugin } = usePlugins()
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (activePlugin && ref.current) {
			activePlugin.component(ref.current)
		}
	}, [activePlugin])
	return (
		<div className="flex h-full w-full">
			<div className="w-48 h-full  border-r border-gray-200">
				<div className="flex flex-col h-full">
					<div className="flex-1">
						{plugins?.map((plugin) => (
							<button
								key={plugin.id}
								type="button"
								onClick={() => setActivePlugin(plugin)}
								className={`w-full px-4 py-3 text-left text-sm font-medium border-b border-gray-100   transition-colors ${
									activePlugin?.id === plugin.id
										? "bg-blue-50 text-blue-700 border-r-2 border-r-blue-500"
										: "text-white "
								}`}
							>
								{plugin.name}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="w-full h-full overflow-y-auto first:h-full" ref={ref} />
		</div>
	)
}
