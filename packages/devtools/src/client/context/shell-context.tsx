import { createContext, createEffect, useContext, JSX, Accessor } from "solid-js"
import { createStore } from "solid-js/store"

import type { TanstackDevtoolsProps } from "../shell.js"
import { tryParseJson } from "../utils/sanitize.js"
import {
	TANSTACK_DEVTOOLS_SETTINGS,
	TANSTACK_DEVTOOLS_STATE,
	getStorageItem,
	setStorageItem,
} from "../utils/storage.js"
import { type DevtoolsState, initialState } from "./shell-reducer.js"

export const ShellContext = createContext<{
	state: Accessor<DevtoolsState>
	setState: (updates: Partial<DevtoolsState>) => void
}>()

interface ContextProps {
	children: JSX.Element
	plugins?: TanstackDevtoolsProps["plugins"]
	config?: ShellClientConfig
}

export const getSettings = () => {
	const settingsString = getStorageItem(TANSTACK_DEVTOOLS_SETTINGS)
	const settings = tryParseJson<DevtoolsState["settings"]>(settingsString)
	return {
		...settings,
	}
}

export const getExistingStateFromStorage = (config?: ShellClientConfig, plugins?: TanstackDevtoolsProps["plugins"]) => {
	const existingState = getStorageItem(TANSTACK_DEVTOOLS_STATE)
	const settings = getSettings()

	const state: DevtoolsState = {
		...initialState,
		...(existingState ? JSON.parse(existingState) : {}),
		plugins: plugins || [],
		settings: {
			...initialState.settings,
			...config,
			...settings,
		},
	}
	return state
}

export type ShellClientConfig = Pick<
	DevtoolsState["settings"],
	| "defaultOpen"
	| "position"
	| "height"
	| "minHeight"
	| "maxHeight"
	| "hideUntilHover"
	| "panelLocation"
	| "requireUrlFlag"
	| "openHotkey"
	| "urlFlag"
>

export const ShellContextProvider = (props: ContextProps) => {
	const [state, setState] = createStore(getExistingStateFromStorage(props.config, props.plugins))

	createEffect(() => {
		const { settings, activePlugin, plugins, ...rest } = state
		// Store user settings for dev tools into local storage
		setStorageItem(TANSTACK_DEVTOOLS_SETTINGS, JSON.stringify(settings))
		// Store general state into local storage
		setStorageItem(TANSTACK_DEVTOOLS_STATE, JSON.stringify(rest))
	})

	const contextValue = {
		state: () => state,
		setState: (updates: Partial<DevtoolsState>) => setState(updates),
	}

	return <ShellContext.Provider value={contextValue}>{props.children}</ShellContext.Provider>
}