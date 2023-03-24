import { Box, Checkbox, Typography } from '@mui/material'
import React from 'react'
import SearchBox from '../search-box'
import * as classes from '../menu-filters-styles'
import { Stack } from '@mui/system'
import Select from 'react-select'

const FilterDate = (props) => {
	console.log('entro')
	const { allOptions, setQuery, displayedOptions, isOptionSelected, toggleSelectedOption } = props
	const options = [
		{ value: 'Que empiezen con', label: 'Que empiezen con' },
		{ value: 'Que terminen con', label: 'Que terminen con' },
		{ value: 'Que contengan', label: 'Que contengan' },
		{ value: 'Iguales a', label: 'Iguales a' },
	]

	return (
		<Box>
			<Typography variant={'caption'}> Mostrar solo resultados</Typography>
			<Select classNamePrefix='Que contengan' options={options} />
			{allOptions !== undefined && (
				<SearchBox
					autoFocus
					autoSearch
					placeholder={'Buscar'}
					onChange={(value) => setQuery(value)}
				/>
			)}
			<Box className={classes.filterItem}>
				{displayedOptions?.map((a) => {
					return (
						<Stack spacing={3}>
							<Stack
								direction={'row'}
								alignItems={'center'}
								key={a.code}
								className={classes.checkList}
							>
								<Checkbox
									size='small'
									className={classes.checkFilter}
									style={{ zIndex: 100 }}
									inputProps={{
										'data-code': a.code,
									}}
									onChange={toggleSelectedOption}
									checked={isOptionSelected(a.code)}
								/>
								<Typography variant='caption'>{a.description}</Typography>
							</Stack>
						</Stack>
					)
				})}
			</Box>
		</Box>
	)
}

export default FilterDate
