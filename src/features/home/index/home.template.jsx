//React
import React from 'react'
//Material
import { Box } from '@mui/material'
//Component
import TimesheetsTable from './home.table'
import { defaultTableConfigurationTimeSheets } from './configurationTable'

/**
 * Home component
 */
const HomeTemplate = (props) => {
	return (
		<Box>
			<TimesheetsTable tableConfig={defaultTableConfigurationTimeSheets} {...props} />
		</Box>
	)
}

export default HomeTemplate
