import React from 'react'
import { Box } from '@mui/material'
import TimesheetsTable from './home.table'
import { defaultTableConfigurationTimeSheets } from './configurationTable'
import Pagination from '../../common/datagrid/pagination'
import * as styles from './home.styles'
import SearchComponent from '../../common/search/SearchComponent'

/**
 * Home component
 */
const HomeTemplate = (props) => {
	return (
		<Box>
			<Box sx={styles.searchContainer}>
				<SearchComponent
					placeholder={''}
					value={''}
					onChange={console.warn('No [onChangeValue] callback defined')}
				/>
			</Box>
			<TimesheetsTable tableConfig={defaultTableConfigurationTimeSheets} {...props} />
			<Pagination pagination={props} />
		</Box>
	)
}

export default HomeTemplate
