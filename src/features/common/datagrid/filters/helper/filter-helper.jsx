export const capitalize = (word) => {
	return word ? word[0].toUpperCase() + word.slice(1) : ''
}
export const FilterType = {
	text: 'text',
	numeric: 'numeric',
	date: 'date',
}

const numericFilters = ['AuthorizedWorkHours', 'Duration']
const dateFilters = ['StartDate', 'EndDate']

export const getFilterType = (fieldName) => {
	const capitalizedFieldName = capitalize(fieldName)
	return dateFilters.includes(capitalizedFieldName)
		? FilterType.date
		: numericFilters.includes(capitalizedFieldName)
		? FilterType.numeric
		: FilterType.text
	//return textFilters.includes(capitalizedFieldName) ? FilterType.Text : FilterType.Numeric
}

export const CriteriaMapping = {
	Code: 'Codijo',
	Name: 'Nombre',
	Description: 'Description',
	TaskDescription: 'Description de tarea',
	NameUser: 'Name',
	Email: 'Email',
	Tags: 'Tags',
}

export const getAllCriteria = () => {
	return Object.entries(CriteriaMapping).sort((a, b) => a[1].localeCompare(b[1]))
}

export const getCriteriaName = (fieldName) => {
	const defaultName = 'Desconocido'
	if (!fieldName) {
		return defaultName
	}
	const updatedFieldName = capitalize(fieldName)
	return CriteriaMapping.hasOwnProperty(updatedFieldName)
		? CriteriaMapping[updatedFieldName]
		: defaultName
}

const RelationalOperatorMapping = {
	equal: 'igual a',
	not_equal: 'diferente de',
	contains: 'contiene',
	starts_with: 'comienza con',
	ends_with: 'termina con',
	between: 'entre',
	greater_than: 'mayor que',
	greater_or_equal_than: 'mayor o igual que',
	less_than: 'menor que',
	less_or_equal_than: 'menor o igual que',
}

export const getRelationalOperatorName = (relationalOperator) => {
	const defaultName = 'Desconocido'
	if (!relationalOperator) {
		return defaultName
	}
	const updatedRelationalOperator = relationalOperator.toLowerCase()
	return RelationalOperatorMapping.hasOwnProperty(updatedRelationalOperator)
		? RelationalOperatorMapping[updatedRelationalOperator]
		: defaultName
}

const stringRelationalOperators = ['equal', 'contains']

export const getRelationalOperatorsForString = () => {
	return Object.entries(RelationalOperatorMapping).filter(([key]) =>
		stringRelationalOperators.includes(key)
	)
}

const numericRelationalOperators = [
	'equal',
	'greater_than',
	'greater_or_equal_than',
	'less_than',
	'less_or_equal_than',
]

export const getRelationalOperatorsForNumber = () => {
	return Object.entries(RelationalOperatorMapping).filter(([key]) =>
		numericRelationalOperators.includes(key)
	)
}

const dateRelationalOperators = [
	'equal',
	'greater_than',
	'greater_or_equal_than',
	'less_than',
	'less_or_equal_than',
]
export const getRelationalOperatorsForDate = () => {
	return Object.entries(RelationalOperatorMapping).filter(([key]) =>
		dateRelationalOperators.includes(key)
	)
}
export const createQueryForFilters = (filters) => {
	var queryByFilter = []
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

export const optionsSelector = (type) => {
	let options = []
	if (type === 'text') {
		options.push({ value: 'starts_with', label: 'Que empiezen con' })
		options.push({ value: 'ends_with', label: 'Que terminen con' })
		options.push({ value: 'contains', label: 'Que contengan' })
		options.push({ value: 'equal', label: 'Iguales a' })
	} else if (type === 'numeric') {
		options.push({ value: 'Que empiezen con', label: 'Que empiezen con' })
		options.push({ value: 'Que terminen con', label: 'Que terminen con' })
		options.push({ value: 'Que contengan', label: 'Que contengan' })
		options.push({ value: 'equal', label: 'Iguales a' })
	}
	return options
}
