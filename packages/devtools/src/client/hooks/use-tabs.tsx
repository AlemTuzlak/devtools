import { createMemo } from "solid-js"
import { useSettingsContext } from "../context/use-devtools-shell-context"
import { tabs } from "../tabs"

export const useTabs = () => {
	const { settings } = useSettingsContext()
	
	const activeTab = createMemo(() => settings().activeTab)

	const Component = createMemo(() => {
		const tab = tabs.find((tab) => tab.id === activeTab())
		return tab?.component
	})

	return {
		tabs,
		Component,
		activeTab,
	}
}