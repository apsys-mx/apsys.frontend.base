import React from 'react'
import { Box, Checkbox, Typography } from '@mui/material'
import SearchBox from './search-box'
import * as classes from '../menu-filters-styles'
import { Stack } from '@mui/system'
import { v4 as uuidv4 } from 'uuid'

const FilterEquals = (props) => {
	const { allOptions, setQuery, displayedOptions, isOptionSelected, toggleSelectedOption } = props

	return (
		<Box>
			{allOptions !== undefined && (
				<SearchBox
					autoFocus
					autoSearch
					placeholder={'Buscar'}
					onChange={(value) => setQuery(value)}
				/>
			)}
			<Box>
				{displayedOptions?.map((a) => {
					return (
						<Stack spacing={3} key={uuidv4()}>
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

export default FilterEquals
