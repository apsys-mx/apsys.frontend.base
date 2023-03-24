/**Mui resources */
import { Box } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import PropTypes from 'prop-types'

const Pagination = (props) => {
	const { pagination } = props
	const getDisplayedRowsLabel = ({ from, to, count }) => {
		return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
	}
	return (
		<Box>
			<TablePagination
				count={pagination.rowsCount}
				rowsPerPage={pagination.rowsPerPage}
				page={pagination.page - 1}
				onPageChange={pagination.onPageChange}
				onRowsPerPageChange={pagination.onRowsPerPageChange}
				showFirstButton={true}
				showLastButton={true}
				labelRowsPerPage={'Filas por pagina'}
				labelDisplayedRows={getDisplayedRowsLabel}
				rowsPerPageOptions={[2, 10, 20, 30]}
			/>
		</Box>
	)
}

Pagination.propTypes = {
	pagination: PropTypes.shape({
		enabled: PropTypes.bool.isRequired,
		page: PropTypes.number.isRequired,
		rowsPerPage: PropTypes.number.isRequired,
		rowsCount: PropTypes.number.isRequired,
		onPageChange: PropTypes.func.isRequired,
		onRowsPerPageChange: PropTypes.func.isRequired,
	}),
}

Pagination.defaultProps = {
	pagination: {
		enabled: false,
		page: 1,
		rowsPerPage: 50,
		rowsCount: 1000,
		onPageChange: () => console.warn('Callback [onPageChange] no defined'),
		onRowsPerPageChange: () => console.warn('Callback [onPageChange] no defined'),
	},
}

export default Pagination
