import { useMemo } from "react"
import { useSettingsContext } from "../context/use-devtools-shell-context"
import { tabs } from "../tabs"

export const useTabs = () => {
	const { settings } = useSettingsContext()
	const { activeTab } = settings

	const { Component } = useMemo(() => {
		const tab = tabs.find((tab) => tab.id === activeTab)
		return { Component: tab?.component }
	}, [activeTab])

	return {
		tabs,
		Component,
		activeTab,
	}
}
