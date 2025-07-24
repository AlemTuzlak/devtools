import { useCallback, useContext } from "react"
import type { Plugin } from "../tabs/index.js"
import { ShellContext } from "./shell-context.js"
import type { DevtoolsState } from "./shell-reducer.js"

/**
 * Returns an object containing the current state and dispatch function of the RDTContext.
 * Throws an error if used outside of a RDTContextProvider.
 * - Saves the state to session storage on every state change.
 * - Saves the settings to local storage on every settings state change.
 * @returns {Object} An object containing the following properties:
 *  - dispatch: A function to dispatch actions to the RDTContext reducer.
 *  - state: The current state of the RDTContext.
 */
const useDevtoolsShellContext = () => {
	const context = useContext(ShellContext)
	if (context === undefined) {
		throw new Error("useRDTContext must be used within a RDTContextProvider")
	}
	const { state, dispatch } = context
	return {
		dispatch,
		state,
	}
}

export const usePlugins = () => {
	const { state, dispatch } = useDevtoolsShellContext()
	const { plugins, activePlugin } = state
	const setActivePlugin = useCallback(
		(plugin: Plugin) => {
			dispatch({
				type: "SET_ACTIVE_PLUGIN",
				payload: plugin,
			})
		},
		[dispatch]
	)
	return { plugins, setActivePlugin, activePlugin }
}

export const useSettingsContext = () => {
	const { dispatch, state } = useDevtoolsShellContext()
	const { settings } = state
	const setSettings = useCallback(
		(settings: Partial<DevtoolsState["settings"]>) => {
			dispatch({
				type: "SET_SETTINGS",
				payload: settings,
			})
		},
		[dispatch]
	)
	return { setSettings, settings }
}

export const usePersistOpen = () => {
	const { dispatch, state } = useDevtoolsShellContext()
	const { persistOpen } = state
	const setPersistOpen = useCallback(
		(persistOpen: boolean) => {
			dispatch({
				type: "SET_PERSIST_OPEN",
				payload: persistOpen,
			})
		},
		[dispatch]
	)
	return { persistOpen, setPersistOpen }
}

export { useDevtoolsShellContext }
