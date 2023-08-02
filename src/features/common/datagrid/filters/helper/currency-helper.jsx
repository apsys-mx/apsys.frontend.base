/**
 * Get currency format to a number
 *
 * @param {number} amount
 */
export const currencyFormat = (amount) => {
	let result = amount
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	return `${result ? formatter.format(result) : '-'}`
}

export const percentageFormated = (percentage) => {
	const option = {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}
	const formatter = new Intl.NumberFormat('en-US', option)
	const discountFormat = formatter.format(percentage)
	return discountFormat
}

export const numberFormat = (amount) => {
	const configurationNumber = {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}
	const numberFormat = new Intl.NumberFormat('en-US', configurationNumber)
	if (amount === 0) return '-'
	else return numberFormat.format(amount)
}

export const numberDecimalFormat = (amount) => {
	const configurationNumber = {
		minimumFractionDigits: 4,
		maximumFractionDigits: 10,
	}
	const numberFormat = new Intl.NumberFormat('en-US', configurationNumber)
	if (amount === 0) return '-'
	else return numberFormat.format(amount)
}
