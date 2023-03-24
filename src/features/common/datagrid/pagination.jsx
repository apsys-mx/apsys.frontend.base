/**Mui resources */
import { Box } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import { useSelector } from 'react-redux'

const Pagination = () => {
	return (
		<Box>
			<TablePagination
				showFirstButton={true}
				showLastButton={true}
				labelRowsPerPage={'Filas por pagina'}
				rowsPerPageOptions={[2, 10, 20, 30]}
			/>
		</Box>
	)
}

export default Pagination
