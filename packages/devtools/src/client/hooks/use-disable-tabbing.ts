import { useEffect } from "react"
import { TANSTACK_DEVTOOLS } from "../utils/storage"

const recursivelyChangeTabIndex = (node: Element | HTMLElement, remove = true) => {
	if (remove) {
		node.setAttribute("tabIndex", "-1")
	} else {
		node.removeAttribute("tabIndex")
	}
	for (const child of node.children) {
		recursivelyChangeTabIndex(child, remove)
	}
}

export const useDisableTabbing = (isOpen: boolean) => {
	useEffect(() => {
		const el = document.getElementById(TANSTACK_DEVTOOLS)
		if (!el) return
		recursivelyChangeTabIndex(el, !isOpen)
	}, [isOpen])
}
