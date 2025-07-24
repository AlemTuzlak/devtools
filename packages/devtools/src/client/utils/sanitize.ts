export const tryParseJson = <T>(json: string | null): T | undefined => {
	if (!json) return undefined
	try {
		return JSON.parse(json)
	} catch (_e) {
		return undefined
	}
}

export const uppercaseFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
