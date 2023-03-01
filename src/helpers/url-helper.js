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
		return process.env.REACT_APP_ROOT === '/'
			? `${baseUrl}`
			: `${baseUrl}${process.env.REACT_APP_ROOT}/${endPoint}`
	} else {
		return process.env.REACT_APP_ROOT === '/'
			? `${baseUrl}/${endPoint}`
			: `${baseUrl}${process.env.REACT_APP_ROOT}/${endPoint}`
	}
}
