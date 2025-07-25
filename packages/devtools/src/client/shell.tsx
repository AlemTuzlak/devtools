import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { ContentPanel } from "./components/content-panel"
import { MainPanel } from "./components/main-panel"
import { Tabs } from "./components/tabs"
import { Trigger } from "./components/trigger"
import { type ShellClientConfig, ShellContextProvider } from "./context/shell-context"
import { usePersistOpen, useSettingsContext } from "./context/use-devtools-shell-context"
import { useDebounce } from "./hooks/use-debounce"
import { useDisableTabbing } from "./hooks/use-disable-tabbing"
import { useHydrated } from "./hooks/use-hydrated"
import "./input.css"
import { createPortal } from "react-dom"
import type { Plugin } from "./tabs"
import { TANSTACK_DEVTOOLS } from "./utils/storage"

export interface TanstackDevtoolsProps {
	// Additional tabs to add to the dev tools
	plugins?: Plugin[]
	config?: ShellClientConfig
}

const DevTools = () => {
	const { setPersistOpen } = usePersistOpen()
	const { settings } = useSettingsContext()
	const { persistOpen } = usePersistOpen()

	const [isOpen, setIsOpen] = useState(settings.defaultOpen || persistOpen)

	const debounceSetOpen = useDebounce(() => {
		setIsOpen(!isOpen)
		setPersistOpen(!isOpen)
	}, 100)
	useHotkeys(settings.openHotkey, () => debounceSetOpen())
	useHotkeys("esc", () => (isOpen ? debounceSetOpen() : null))
	useDisableTabbing(isOpen)
	if (settings.requireUrlFlag && typeof window !== "undefined" && !window.location.href.includes(settings.urlFlag))
		return null

	return (
		<div data-testid={TANSTACK_DEVTOOLS} id={TANSTACK_DEVTOOLS} className="tanstack-dev-tools tanstack-dev-tools-reset">
			<Trigger isOpen={isOpen} setIsOpen={setIsOpen} />
			<MainPanel isOpen={isOpen}>
				<div className="flex h-full">
					<Tabs setIsOpen={setIsOpen} />
					<ContentPanel />
				</div>
			</MainPanel>
		</div>
	)
}
export const Shell = ({ plugins, config }: TanstackDevtoolsProps) => {
	const hydrated = useHydrated()
	if (!hydrated) return null // Prevent rendering until hydrated
	return (
		<ShellContextProvider plugins={plugins} config={config}>
			{createPortal(<DevTools />, document.body)}
		</ShellContextProvider>
	)
}
