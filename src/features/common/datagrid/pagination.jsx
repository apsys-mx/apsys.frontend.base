/**Mui resources */
import { Box } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import propTypes from 'prop-types'

/**Resources */
import * as styles from './pagination.styles'

const Pagination = (props) => {
	const { pagination, onPageChange, onRowsPerPageChange } = props
	const getDisplayedRowsLabel = ({ from, to, count }) => {
		const countValue = count !== -1 ? count : `más de ${to}`
		return `${from}–${to} de ${countValue}`
	}
	return (
		<Box sx={styles.root}>
			<TablePagination
				count={pagination.total}
				rowsPerPage={pagination.pageSize}
				page={pagination.pageNumber}
				onPageChange={(event, newPage) => onPageChange(newPage)}
				onRowsPerPageChange={(event) => {
					onRowsPerPageChange(event.target.value, 10)
					onPageChange(0)
				}}
				showFirstButton={true}
				showLastButton={true}
				labelRowsPerPage={'Filas por pagina'}
				labelDisplayedRows={getDisplayedRowsLabel}
				rowsPerPageOptions={[10, 20, 50, 100, 500]}
			/>
		</Box>
	)
}

Pagination.propTypes = {
	pagination: propTypes.shape({
		enabled: propTypes.bool.isRequired,
		page: propTypes.number.isRequired,
		rowsPerPage: propTypes.number.isRequired,
		rowsCount: propTypes.number.isRequired,
		pageSize: propTypes.number.isRequired,
		pageNumber: propTypes.number.isRequired,
		total: propTypes.number.isRequired,
	}),
	onPageChange: propTypes.func,
	onRowsPerPageChange: propTypes.func,
}

Pagination.defaultProps = {
	pagination: {
		enabled: false,
		page: 0,
		rowsPerPage: 50,
		rowsCount: 1000,
		pageSize: 10,
		pageNumber: 1,
		total:0
	},
	onPageChange: () => console.warn('Callback [onPageChange] no defined'),
	onRowsPerPageChange: () => console.warn('Callback [onPageChange] no defined'),
}

export default Pagination
