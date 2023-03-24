import React from 'react'
import { Box } from '@mui/material'
import TimesheetsTable from './home.table'
import { defaultTableConfigurationTimeSheets } from './configurationTable'

/**
 * Home component
 */
const HomeTemplate = () => {
	return (
		<Box>
			<TimesheetsTable tableConfig={defaultTableConfigurationTimeSheets} items={[]} />
		</Box>
	)
}

export default HomeTemplate
