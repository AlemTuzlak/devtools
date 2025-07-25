import { useContext, createMemo } from "solid-js"
import type { Plugin } from "../tabs/index.js"
import { ShellContext } from "./shell-context.js"
import type { DevtoolsState } from "./shell-reducer.js"

/**
 * Returns an object containing the current state and setState function of the ShellContext.
 * Throws an error if used outside of a ShellContextProvider.
 */
const useDevtoolsShellContext = () => {
	const context = useContext(ShellContext)
	if (context === undefined) {
		throw new Error("useDevtoolsShellContext must be used within a ShellContextProvider")
	}
	return context
}

export const usePlugins = () => {
	const { state, setState } = useDevtoolsShellContext()
	
	const plugins = createMemo(() => state.plugins)
	const activePlugin = createMemo(() => state.activePlugin)
	
	const setActivePlugin = (plugin: Plugin) => {
		setState("activePlugin", plugin)
	}
	
	return { plugins, setActivePlugin, activePlugin }
}

export const useSettingsContext = () => {
	const { state, setState } = useDevtoolsShellContext()
	
	const settings = createMemo(() => state.settings)
	
	const setSettings = (newSettings: Partial<DevtoolsState["settings"]>) => {
		setState("settings", (prev) => ({ ...prev, ...newSettings }))
	}
	
	return { setSettings, settings }
}

export const usePersistOpen = () => {
	const { state, setState } = useDevtoolsShellContext()
	
	const persistOpen = createMemo(() => state.persistOpen)
	
	const setPersistOpen = (value: boolean) => {
		setState("persistOpen", value)
	}
	
	return { persistOpen, setPersistOpen }
}

export { useDevtoolsShellContext }