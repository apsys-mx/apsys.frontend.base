import React from 'react'
import propTypes from 'prop-types'
//Templates
import DataGrid from '../../common/datagrid/data-grid'
//
const TimesheetsTable = ({ items, tableConfig }) => {
	return (
		<div>
			<DataGrid headers={tableConfig} data={items} />
		</div>
	)
}
TimesheetsTable.propTypes = {
	items: propTypes.array,
}
TimesheetsTable.defultProps = {
	items: [],
}
export default TimesheetsTable
