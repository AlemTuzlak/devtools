import type { JSX } from "react"
import { PagesTab } from "./plugins-tab"
import { SettingsTab } from "./settings-tab"

export const tabs = [
	{
		id: "pages",
		name: "Pages",
		component: <PagesTab />,
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
				<path d="M8 6h10" />
				<path d="M6 12h9" />
				<path d="M11 18h7" />
			</svg>
		),
	},
	{
		name: "Settings",

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
				<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
				<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
				<path d="M12 2v2" />
				<path d="M12 22v-2" />
				<path d="m17 20.66-1-1.73" />
				<path d="M11 10.27 7 3.34" />
				<path d="m20.66 17-1.73-1" />
				<path d="m3.34 7 1.73 1" />
				<path d="M14 12h8" />
				<path d="M2 12h2" />
				<path d="m20.66 7-1.73 1" />
				<path d="m3.34 17 1.73-1" />
				<path d="m17 3.34-1 1.73" />
				<path d="m11 13.73-4 6.93" />
			</svg>
		),
		id: "settings",
		component: <SettingsTab />,
	},
] as const

export interface Tab {
	name: string | JSX.Element
	icon: JSX.Element
	id: string
	component: JSX.Element
}

export type Tabs = (typeof tabs)[number]["id"]

export interface Plugin {
	name: string | JSX.Element
	icon: JSX.Element
	id: string
	component: (el: HTMLDivElement) => void
}
