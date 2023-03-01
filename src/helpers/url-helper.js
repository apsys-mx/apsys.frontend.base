import { isNullOrEmpty } from './string-helper'

/**
 * Get the absolute url address
 * @param {*} endPoint
 */
export function getAbsoluteUrlAddress(endPoint) {
	let baseUrl = `${window.location.protocol}//${window.location.hostname}${
		window.location.port ? `:${window.location.port}` : ''
	}`
	if (isNullOrEmpty(endPoint)) {
		return import.meta.env.BASE_URL === '/'
			? `${baseUrl}`
			: `${baseUrl}${import.meta.env.BASE_URL}/${endPoint}`
	} else {
		return import.meta.env.BASE_URL === '/'
			? `${baseUrl}/${endPoint}`
			: `${baseUrl}${import.meta.env.BASE_URL}/${endPoint}`
	}
}
