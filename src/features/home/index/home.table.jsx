//Material
import React from 'react'
import propTypes from 'prop-types'
//Templates
import DataGrid from '../../common/datagrid/data-grid'
//
const TimesheetsTable = ({
	items,
	pageNumber,
	pageSize,
	totalitems,
	tableConfig,
	handleChangeRowsPerPage,
	handleChangePage,
	onchangeSorting,
	sortBy,
	sortDirection,
}) => {
	return (
		<div>
			<DataGrid headers={tableConfig} data={items} />
		</div>
	)
}
TimesheetsTable.propTypes = {
	items: propTypes.array,
	pageNumber: propTypes.number,
	pageSize: propTypes.number,
	totalitems: propTypes.number,
	onchangeSorting: propTypes.func,
	handleChangePage: propTypes.func,
	handleChangeRowsPerPage: propTypes.func,
}
TimesheetsTable.defultProps = {
	items: [],
	pageNumber: 0,
	pageSize: 20,
	totalitems: 0,
	onchangeSorting: () => console.warn('No [onchangeSorting] CallBack defined'),
	handleChangePage: () => console.warn('No[handle change page] Callback defined'),
	handleChangeRowsPerPage: () => console.warn('No[handle change rows per page] Callback defined'),
}
export default TimesheetsTable
