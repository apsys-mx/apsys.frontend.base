import { isNullOrEmpty } from './string-helper'

/**
 * Parse input string to pagination object
 * @param {string} queryString
 * @returns {object}
 */
export const parsePaginationFromQueryString = (queryString, defaultPagination) => {
	const pagination = parseObjectFromString(queryString, paginationKeys, defaultPagination)
	Object.entries(pagination).forEach(([key, value]) => {
		pagination[key] = parseInt(value)
	})
	return pagination
}

/**
 * Parse input string to sorting object
 * @param {string} queryString
 * @returns
 */
export const parseSortingFromQueryString = (queryString, defaultPagination) => {
	return parseObjectFromString(queryString, sortingKeys, defaultPagination)
}

const parseObjectFromString = (str, allowedKeys, defaultObject = {}) => {
	if (isNullOrEmpty(str)) {
		return defaultObject
	}
	const parsedObject = str
		.replace('?', '')
		.split('&')
		.map((item) => item.split('='))
		.filter(([key, value]) => allowedKeys.includes(key) && isValidPropertyValue(value))
		.reduce((objectResult, [key, value]) => {
			objectResult[key] = value
			return objectResult
		}, {})

	allowedKeys.forEach((key) => {
		if (!parsedObject.hasOwnProperty(key) && defaultObject.hasOwnProperty(key)) {
			parsedObject[key] = defaultObject[key]
		}
	})

	return parsedObject
}

/**
 * Parse input string to filters object
 * @param {string} queryString
 * @returns {array} An array of filters
 */
export const parseFiltersFromQueryString = (queryString) => {
	if (isNullOrEmpty(queryString)) {
		return []
	}
	const filters = decodeURI(queryString)
		.replace('?', '')
		.split('&')
		.reduce((result, item) => {
			const [key, data] = item.split('=')
			if (paginationKeys.includes(key) || sortingKeys.includes(key)) {
				return result
			}
			if (isValidPropertyName(key) && isValidPropertyValue(data)) {
				const [values, relationalOperator] = data.split('||')
				const camelCaseKey = key[0].toLowerCase() + key.substring(1)
				const resultIsContainValue = result.some((item) => item.fieldName === camelCaseKey)
				if (resultIsContainValue) {
					result = result.map((item) => {
						if (item.fieldName === camelCaseKey) {
							const items = values
								.split('_')
								.filter((v) => !isNullOrEmpty(v))
								.map((v) => (v === 'null' ? null : v))
							const isContainValue = item?.values.some((item) => {
								return items.some((value) => value === item)
							})
							if (!isContainValue) item.values = item.values.concat(items)
						}
						return item
					})
				} else {
					const filter = {
						fieldName: camelCaseKey,
						values: values
							.split('_')
							.filter((v) => !isNullOrEmpty(v))
							.map((v) => (v === 'null' ? null : v)),
					}
					if (isValidPropertyValue(relationalOperator)) {
						filter.relationalOperatorType = relationalOperator
					}
					result.push(filter)
				}
			}
			return result
		}, [])
	return filters
}

/**
 * Converts pagination object to string
 * @param {object} pagination
 * @returns {string}
 */
export const convertPaginationToString = (pagination) => {
	return convertObjectToString(pagination, paginationKeys)
}

/**
 * Converts sorting object to string
 * @param {object} sorting
 * @returns
 */
export const convertSortingToString = (sorting) => {
	return convertObjectToString(sorting, sortingKeys)
}

const convertObjectToString = (object, allowedKeys) => {
	if (!object || Array.isArray(object)) {
		return ''
	}
	const objectStrings = Object.entries(object)
		.filter(([key, value]) => allowedKeys.includes(key) && isValidPropertyValue(value))
		.map(([key, value]) => `${key}=${value}`)
	return objectStrings.join('&')
}

/**
 * Convert an array of filters to a string
 * @param {array} filters A set of filters
 * @returns {string} An string that represents the valid filters
 */
export const convertFiltersToString = (filters) => {
	if (!filters) {
		return ''
	}
	const filterStrings = filters.map(({ fieldName, values, relationalOperatorType }) => {
		if (!isValidPropertyName(fieldName) || !values || values.length === 0) {
			return ''
		}
		let filterStr = `${fieldName}=${values.join('_')}`
		if (!isNullOrEmpty(relationalOperatorType)) {
			filterStr += `||${relationalOperatorType}`
		}
		return filterStr
	})
	return filterStrings.join('&')
}

const isValidPropertyValue = (value) => {
	if (!value) {
		return false
	}
	return value.toString().trim().length !== 0
}

const isValidPropertyName = (key) => {
	return !isNullOrEmpty(key)
}

export const getLookupValue = (queryString) => {
	if (!queryString) {
		return ''
	}

	const queryItem = queryString
		.replace('?', '')
		.split('&')
		.map((item) => item.split('='))
		.find((item) => item.length > 1 && item[0] === 'query')

	return queryItem ? queryItem[1] : ''
}
const paginationKeys = ['pageNumber', 'pageSize']
const sortingKeys = ['sortBy', 'sortDirection']
export const createQueryForFilters = (filters) => {
	let queryByFilter = []
	if (filters.length > 0) {
		queryByFilter = filters?.map((filter) => {
			if (
				filter &&
				filter.fieldName?.length > 0 &&
				filter.relationalOperatorType?.length > 0 &&
				filter.values?.length > 0
			) {
				return `&${filter.fieldName}=${filter.values.join('|')}||${
					filter.relationalOperatorType
				}`
			} else {
				return ''
			}
		})
	}
	return queryByFilter.join('')
}
