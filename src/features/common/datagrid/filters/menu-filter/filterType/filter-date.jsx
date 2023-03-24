import React, { useState } from 'react'
import { Box } from '@mui/material'

import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

const FilterDate = (props) => {
	const [valueDate, setValue] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	])

	return (
		<Box>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<DateRange
					editableDateInputs={true}
					moveRangeOnFirstSelection={false}
					ranges={valueDate}
					onChange={(item) => setValue([item.selection])}
				/>
			</div>
		</Box>
	)
}

export default FilterDate
