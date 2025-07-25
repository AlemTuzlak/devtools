import { For } from "solid-js"
import { usePersistOpen, useSettingsContext } from "../context/use-devtools-shell-context"
import { useHorizontalScroll } from "../hooks/use-horizontal-scroll"
import { useTabs } from "../hooks/use-tabs"
import type { Tab as TabType, Tabs as TabsType } from "../tabs"

interface TabsProps {
	setIsOpen?: (value: boolean) => void
	plugins?: TabType[]
}

const Tab = (props: {
	tab: TabType
	activeTab?: string
	class?: string
	onClick?: () => void
}) => {
	const { setSettings } = useSettingsContext()

	const handleClick = () => {
		if (props.onClick) {
			props.onClick()
		} else {
			setSettings({ activeTab: props.tab.id as TabsType })
		}
	}

	const isActive = () => props.activeTab === props.tab.id

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			data-testid={props.tab.id}
			onClick={handleClick}
			class={`group relative flex shrink-0 cursor-pointer items-center justify-center border-0 border-b border-solid border-b-[#212121] border-r-[#212121] p-2 font-sans transition-all ${
				!isActive() ? "hover:bg-[#212121]" : "bg-[#212121]"
			} hover:bg-[#212121]/50 ${props.class || ""}`}
		>
			<div class="group-hover:opacity-80 transition-all">{props.tab.icon}</div>
			<div class="duration-400 invisible text-white opacity-0 transition after:absolute after:-left-2 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:-rotate-90 after:border-x-4 after:border-b-[6px] after:border-x-transparent after:border-b-gray-700 group-hover:visible absolute left-full z-50 ml-2 whitespace-nowrap rounded border border-gray-700 bg-gray-800 px-2 group-hover:opacity-100">
				{props.tab.name}
			</div>
		</div>
	)
}

export const Tabs = (props: TabsProps) => {
	const { settings } = useSettingsContext()
	const { setPersistOpen } = usePersistOpen()
	const { tabs } = useTabs()
	const scrollRef = useHorizontalScroll()

	return (
		<div class="relative flex h-full bg-gray-800">
			<div ref={scrollRef} class="tanstack-dev-tools-tab flex h-full w-full flex-col">
				<For each={tabs}>
					{(tab) => (
						<Tab
							tab={{
								...tab,
								name: tab.name,
							}}
							activeTab={settings().activeTab}
							class="cursor-pointer"
						/>
					)}
				</For>
				<div class="mt-auto flex w-full flex-col items-center">
					<Tab
						class="hover:text-red-600"
						tab={{
							icon: (
								// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							),
							id: "close",
							name: "Close",
							component: <div />,
						}}
						onClick={() => {
							setPersistOpen(false)
							props.setIsOpen?.(false)
						}}
					/>
				</div>
			</div>
		</div>
	)
}
