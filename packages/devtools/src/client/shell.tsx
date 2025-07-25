import { createSignal, createEffect, Show } from "solid-js"
import { Portal } from "solid-js/web"
import { createHotkey } from "solid-hotkeys"
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

	const [isOpen, setIsOpen] = createSignal(settings().defaultOpen || persistOpen())

	const debounceSetOpen = useDebounce(() => {
		const newIsOpen = !isOpen()
		setIsOpen(newIsOpen)
		setPersistOpen(newIsOpen)
	}, 100)

	createHotkey(() => settings().openHotkey, () => debounceSetOpen())
	createHotkey("Escape", () => isOpen() ? debounceSetOpen() : null)
	
	useDisableTabbing(isOpen)

	createEffect(() => {
		if (settings().requireUrlFlag && typeof window !== "undefined" && !window.location.href.includes(settings().urlFlag)) {
			return null
		}
	})

	return (
		<Show when={!settings().requireUrlFlag || (typeof window !== "undefined" && window.location.href.includes(settings().urlFlag))}>
			<div data-testid={TANSTACK_DEVTOOLS} id={TANSTACK_DEVTOOLS} class="tanstack-dev-tools tanstack-dev-tools-reset">
				<Trigger isOpen={isOpen()} setIsOpen={setIsOpen} />
				<MainPanel isOpen={isOpen()}>
					<div class="flex h-full">
						<Tabs setIsOpen={setIsOpen} />
						<ContentPanel />
					</div>
				</MainPanel>
			</div>
		</Show>
	)
}

export const Shell = (props: TanstackDevtoolsProps) => {
	const hydrated = useHydrated()
	
	return (
		<Show when={hydrated()}>
			<ShellContextProvider plugins={props.plugins} config={props.config}>
				<Portal mount={document.body}>
					<DevTools />
				</Portal>
			</ShellContextProvider>
		</Show>
	)
}