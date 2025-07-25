import { createMemo } from "solid-js"
import { useSettingsContext } from "../context/use-devtools-shell-context"
import { tabs } from "../tabs"

export const useTabs = () => {
	const { settings } = useSettingsContext()

	const Component = createMemo(() => {
		const tab = tabs.find((tab) => tab.id === settings().activeTab)
		return tab?.component || (() => <></>)
	})

	return {
		tabs,
		Component,
		activeTab: () => settings().activeTab,
	}
}