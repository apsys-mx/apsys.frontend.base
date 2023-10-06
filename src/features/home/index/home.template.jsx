import React from 'react'
import { Box, TablePagination } from '@mui/material'
import TimesheetsTable from './home.table'
import { defaultTableConfigurationTimeSheets } from './configurationTable'
// import Pagination from '../../common/datagrid/pagination'
import * as styles from './home.styles'
import SearchComponent from '../../common/search/search-component'
import DialogComponet from '../../common/dialog/dialog-componet'

/**
 * Home component
 */
const HomeTemplate = ({
	response,
	onChangePage,
	handleChangeRowsPerPage,
	onchangeSorting,
	sorting,
}) => {
	return (
		<Box>
			{/* <Box sx={styles.searchContainer}>
				<SearchComponent
					placeholder={''}
					value={''}
					onChange={console.warn('No [onChangeValue] callback defined')}
				/>
			</Box> */}
			<TimesheetsTable
				tableConfig={defaultTableConfigurationTimeSheets}
				{...response}
				onchangeSorting={onchangeSorting}
				sortBy={
					sorting.sortBy && sorting.sortBy.length > 0 ? sorting.sortBy : 'projectName'
				}
				sortDirection={
					sorting.sortDirection && sorting.sortDirection.length > 0
						? sorting.sortDirection
						: 'desc'
				}
			/>
			<TablePagination
				component='div'
				count={100}
				page={1}
				onPageChange={(event, newPage) => onChangePage(newPage)}
				rowsPerPageOptions={[5, 10, 20, 50, 100]}
				rowsPerPage={20}
				onRowsPerPageChange={(event) => {
					handleChangeRowsPerPage(event.target.value, 10)
					onChangePage(0)
				}}
				labelRowsPerPage={'paginacion'}
				SelectProps={{
					inputProps: {
						'aria-label': 'page number',
					},
				}}
				showFirstButton
				showLastButton
			/>
			{/* <Pagination
				pagination={[]}
				onPageChange={onChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/> */}
			<DialogComponet
				open={true}
				secondaryAction='Cancelar'
				primaryAction='Aceptar'
				title='Title modal'
				content='Content Modal Content ModalContent ModalContent ModalContent Modal'
				subcontent='SubContent SubContent SubContent SubContent SubContent'
			/>
		</Box>
	)
}

export default HomeTemplate
