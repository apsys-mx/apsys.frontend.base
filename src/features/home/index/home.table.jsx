import { Box, Stack } from '@mui/material'
import React from 'react'
import SearchComponent from '../../common/search/SearchComponent'
import * as styles from './home.styles'
const HomeTable = () => {
	return (
		<div>
			<Box sx={styles.searchContainer}>
				<SearchComponent
					placeholder={''}
					value={''}
					onChange={console.warn('No [onChangeValue] callback defined')}
				/>
			</Box>
			ComponentTable
		</div>
	)
}
export default HomeTable
