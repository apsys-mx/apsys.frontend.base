/**
 * It determines if a string is null or empty
 *
 * @export
 * @param {string} value String to verify if it is null or empty
 */
export function isNullOrEmpty(value) {
	if (!value) {
		return true
	}
	let trimmed = value.trim()
	if (trimmed.length === 0) {
		return true
	}
	return false
}

/**
 * Method to splite lines from string to array taking each line as a new element.
 *
 * @param {string} str
 */
export const splitLines = (str) => (isNullOrEmpty(str) ? [] : str.split(/\r?\n/))

export const filterCodesEmpty = (arrayCodes) => arrayCodes.filter((d) => !isNullOrEmpty(d))

export const capitalize = (word) => {
	return word ? word[0].toUpperCase() + word.slice(1) : ''
}
