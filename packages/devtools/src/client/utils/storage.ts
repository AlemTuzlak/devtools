export const getStorageItem = (key: string) => localStorage.getItem(key)
export const setStorageItem = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value)
	} catch (_e) {
		return
	}
}
export const getSessionItem = (key: string) => sessionStorage.getItem(key)
export const setSessionItem = (key: string, value: string) => {
	try {
		sessionStorage.setItem(key, value)
	} catch (_e) {
		return
	}
}

export const getBooleanFromStorage = (key: string) => getStorageItem(key) === "true"
export const getBooleanFromSession = (key: string) => getSessionItem(key) === "true"

export const TANSTACK_DEVTOOLS = "tanstack_devtools"
export const TANSTACK_DEVTOOLS_STATE = "tanstack_devtools_state"
export const TANSTACK_DEVTOOLS_SETTINGS = "tanstack_devtools_settings"
