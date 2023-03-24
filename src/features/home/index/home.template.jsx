import React from 'react'
import { Box } from '@mui/material'
import TimesheetsTable from './home.table'
import { defaultTableConfigurationTimeSheets } from './configurationTable'
import Pagination from '../../common/datagrid/pagination'

/**
 * Home component
 */
const HomeTemplate = () => {
	return (
		<Box>
			<TimesheetsTable tableConfig={defaultTableConfigurationTimeSheets} items={[]} />
			<Pagination />
		</Box>
	)
}

export default HomeTemplate
