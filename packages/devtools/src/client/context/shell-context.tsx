import type { Dispatch } from "react"
import type React from "react"
import { createContext, useEffect, useMemo, useReducer } from "react"

import type { TanstackDevtoolsProps } from "../shell.js"
import { tryParseJson } from "../utils/sanitize.js"
import {
	TANSTACK_DEVTOOLS_SETTINGS,
	TANSTACK_DEVTOOLS_STATE,
	getStorageItem,
	setStorageItem,
} from "../utils/storage.js"
import { type DevtoolsState, type ReactRouterDevtoolsActions, initialState, shellReducer } from "./shell-reducer.js"

export const ShellContext = createContext<{
	state: DevtoolsState
	dispatch: Dispatch<ReactRouterDevtoolsActions>
}>({ state: initialState, dispatch: () => null })

ShellContext.displayName = "ShellContext"

interface ContextProps {
	children: React.ReactNode
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

export const ShellContextProvider = ({ children, plugins, config }: ContextProps) => {
	const [state, dispatch] = useReducer(shellReducer, getExistingStateFromStorage(config, plugins))
	// biome-ignore lint/correctness/useExhaustiveDependencies: investigate
	const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

	useEffect(() => {
		const { settings, activePlugin, plugins, ...rest } = state
		// Store user settings for dev tools into local storage
		setStorageItem(TANSTACK_DEVTOOLS_SETTINGS, JSON.stringify(settings))
		// Store general state into local storage
		setStorageItem(TANSTACK_DEVTOOLS_STATE, JSON.stringify(rest))
	}, [state])

	return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>
}
