import type { Plugin } from "../tabs"

type TriggerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "middle-left" | "middle-right"

export type DevtoolsState = {
	settings: {
		activeTab: string
		height: number
		/**
		 * The maximum height of the panel
		 * @default 800
		 */
		maxHeight: number
		/**
		 * The minimum height of the panel
		 * @default 200
		 */
		minHeight: number
		/**
		 * Whether the dev tools should be open by default
		 * @default false
		 */
		defaultOpen: boolean
		/**
		 * Whether the dev tools trigger should be hidden until the user hovers over it
		 * @default false
		 */
		hideUntilHover: boolean
		/**
		 * The position of the trigger button
		 * @default "bottom-right"
		 */
		position: TriggerPosition
		/**
		 * The initial expansion level of the JSON viewer objects
		 * @default 1
		 */
		expansionLevel: number

		/**
		 * The location of the panel once it is open
		 * @default "bottom"
		 */
		panelLocation: "top" | "bottom"
		/**
		 * The hotkey to open the dev tools
		 * @default "shift+a"
		 */
		openHotkey: string
		/**
		 * Whether to require the URL flag to open the dev tools
		 * @default false
		 */
		requireUrlFlag: boolean
		/**
		 * The URL flag to open the dev tools, used in conjunction with requireUrlFlag (if set to true)
		 * @default "rdt"
		 */
		urlFlag: string
	}
	plugins?: Plugin[]
	activePlugin?: Plugin | undefined
	persistOpen: boolean
}

export const initialState: DevtoolsState = {
	settings: {
		activeTab: "page",
		height: 400,
		maxHeight: 600,
		minHeight: 200,
		defaultOpen: false,
		hideUntilHover: false,
		position: "bottom-right",
		expansionLevel: 1,

		panelLocation: "bottom",
		openHotkey: "shift+a",
		requireUrlFlag: false,
		urlFlag: "tanstack-devtools",
	},
	activePlugin: undefined,
	persistOpen: false,
}

type SetWholeState = {
	type: "SET_WHOLE_STATE"
	payload: DevtoolsState
}

type SetActivePlugin = {
	type: "SET_ACTIVE_PLUGIN"
	payload: Plugin | undefined
}

type SetSettings = {
	type: "SET_SETTINGS"
	payload: Partial<DevtoolsState["settings"]>
}

type SetPersistOpenAction = {
	type: "SET_PERSIST_OPEN"
	payload: boolean
}

/** Aggregate of all action types */
export type ReactRouterDevtoolsActions = SetSettings | SetWholeState | SetPersistOpenAction | SetActivePlugin

export const shellReducer = (state: DevtoolsState, { type, payload }: ReactRouterDevtoolsActions): DevtoolsState => {
	switch (type) {
		case "SET_SETTINGS":
			return {
				...state,
				settings: {
					...state.settings,
					...payload,
				},
			}
		case "SET_ACTIVE_PLUGIN":
			return {
				...state,
				activePlugin: payload,
			}

		case "SET_WHOLE_STATE": {
			return {
				...payload,
			}
		}

		case "SET_PERSIST_OPEN":
			return {
				...state,
				persistOpen: payload,
			}
		default:
			return state
	}
}
