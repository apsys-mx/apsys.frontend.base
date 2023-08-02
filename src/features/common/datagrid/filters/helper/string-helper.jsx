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
	return trimmed.length === 0
}
