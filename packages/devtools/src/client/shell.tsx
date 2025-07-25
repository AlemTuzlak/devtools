import { createSignal, createEffect, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import { ContentPanel } from "./components/content-panel"
import { MainPanel } from "./components/main-panel"
import { Tabs } from "./components/tabs"
import { Trigger } from "./components/trigger"
import { type ShellClientConfig, ShellContextProvider } from "./context/shell-context"
import { usePersistOpen, useSettingsContext } from "./context/use-devtools-shell-context"
import { createDebounce } from "./hooks/use-debounce"
import { useDisableTabbing } from "./hooks/use-disable-tabbing"
import { createHydrated } from "./hooks/use-hydrated"
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

	const debounceSetOpen = createDebounce(() => {
		setIsOpen(!isOpen())
		setPersistOpen(!isOpen())
	}, 100)

	// Handle hotkeys with basic keyboard event listeners
	createEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const hotkey = settings().openHotkey
			const [modifier, key] = hotkey.split('+')
			
			// Check for hotkey combination
			if (
				((modifier === 'shift' && e.shiftKey) || 
				 (modifier === 'ctrl' && e.ctrlKey) || 
				 (modifier === 'alt' && e.altKey)) &&
				e.key.toLowerCase() === key.toLowerCase()
			) {
				e.preventDefault()
				debounceSetOpen()
			}
			
			// Handle escape key
			if (e.key === 'Escape' && isOpen()) {
				debounceSetOpen()
			}
		}
		
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	})

	useDisableTabbing(isOpen)
	
	createEffect(() => {
		if (settings().requireUrlFlag && typeof window !== "undefined" && !window.location.href.includes(settings().urlFlag))
			return null
	})

	return (
		<div data-testid={TANSTACK_DEVTOOLS} id={TANSTACK_DEVTOOLS} class="tanstack-dev-tools tanstack-dev-tools-reset">
			<Trigger isOpen={isOpen()} setIsOpen={setIsOpen} />
			<MainPanel isOpen={isOpen()}>
				<div class="flex h-full">
					<Tabs setIsOpen={setIsOpen} />
					<ContentPanel />
				</div>
			</MainPanel>
		</div>
	)
}

export const Shell = (props: TanstackDevtoolsProps) => {
	const hydrated = createHydrated()
	
	return (
		<Show when={hydrated()}>
			<ShellContextProvider plugins={props.plugins} config={props.config}>
				<Portal>
					<DevTools />
				</Portal>
			</ShellContextProvider>
		</Show>
	)
}