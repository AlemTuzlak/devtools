import clsx from "clsx"

import { usePersistOpen, useSettingsContext } from "../context/use-devtools-shell-context"

import { useHorizontalScroll } from "../hooks/use-horizontal-scroll"
import { useTabs } from "../hooks/use-tabs"
import type { Tab as TabType, Tabs as TabsType } from "../tabs"

interface TabsProps {
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
	plugins?: TabType[]
}

const Tab = ({
	tab,
	activeTab,
	className,
	onClick,
}: {
	tab: TabType
	activeTab?: string
	className?: string
	onClick?: () => void
}) => {
	const { setSettings } = useSettingsContext()
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: ignored
		<div
			data-testid={tab.id}
			onClick={() => (onClick ? onClick() : setSettings({ activeTab: tab.id as TabsType }))}
			className={clsx(
				"group relative flex shrink-0 cursor-pointer items-center justify-center border-0 border-b border-solid border-b-[#212121] border-r-[#212121] p-2 font-sans transition-all",
				activeTab !== tab.id && "hover:bg-[#212121]",
				activeTab === tab.id && "bg-[#212121]",
				"hover:bg-[#212121]/50"
			)}
		>
			<div className={clsx(className, "group-hover:opacity-80 transition-all")}>{tab.icon}</div>
			<div
				className={clsx(
					"duration-400 invisible text-white opacity-0 transition after:absolute after:-left-2 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:-rotate-90 after:border-x-4 after:border-b-[6px] after:border-x-transparent after:border-b-gray-700 group-hover:visible",
					"absolute left-full z-50 ml-2 whitespace-nowrap rounded border border-gray-700 bg-gray-800 px-2 group-hover:opacity-100"
				)}
			>
				{tab.name}
			</div>
		</div>
	)
}

export const Tabs = ({ setIsOpen }: TabsProps) => {
	const { settings } = useSettingsContext()
	const { setPersistOpen } = usePersistOpen()
	const { activeTab } = settings
	const { tabs } = useTabs()
	const scrollRef = useHorizontalScroll()

	return (
		<div className="relative flex h-full bg-gray-800">
			<div ref={scrollRef} className="tanstack-dev-tools-tab  flex h-full w-full flex-col">
				{tabs.map((tab) => (
					<Tab
						key={tab.id}
						tab={{
							...tab,
							name: tab.name,
						}}
						activeTab={activeTab}
						className={clsx("cursor-pointer")}
					/>
				))}
				<div className={clsx("mt-auto flex w-full flex-col items-center")}>
					<Tab
						className="hover:text-red-600"
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
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							),
							id: "close",
							name: "Close",
							component: <></>,
						}}
						onClick={() => {
							setPersistOpen(false)
							setIsOpen?.(false)
						}}
					/>
				</div>
			</div>
		</div>
	)
}
