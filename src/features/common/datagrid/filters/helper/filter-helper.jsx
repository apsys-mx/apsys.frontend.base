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
