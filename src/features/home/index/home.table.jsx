//Material
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
//Templates
import DataGrid from '../../common/datagrid/data-grid'
import moment from 'moment'
//
const TimesheetsTable = ({ items, tableConfig, onchangeSorting, sortBy, sortDirection }) => {
	/**
	 * State hook for configTable
	 */
	const [localTableConfig, setLocalTableConfig] = useState([])
	useEffect(() => {
		if (tableConfig) {
			var local = tableConfig.map((config) => {
				return { ...config }
			})
			setLocalTableConfig(local)
		}
	}, [tableConfig])
	/**
	 * Get the header configuration
	 */
	const enhancedConfiguration = localTableConfig.map((config) => {
		switch (config.dataSource) {
			case 'startDate':
				config.onRenderProperty = (item) => {
					return moment(item.startDate).format('DD/MM/YYYY')
				}
				break
			case 'endDate':
				config.onRenderProperty = (item) => {
					return moment(item.endDate).format('DD/MM/YYYY')
				}
				break
			default:
		}
		return config
	})
	return (
		<div>
			<DataGrid headers={enhancedConfiguration} data={items} />
		</div>
	)
}
TimesheetsTable.propTypes = {
	items: propTypes.array,
	onchangeSorting: propTypes.func,
	handleChangePage: propTypes.func,
	handleChangeRowsPerPage: propTypes.func,
}
TimesheetsTable.defultProps = {
	items: [],
	onchangeSorting: () => console.warn('No [onchangeSorting] CallBack defined'),
	handleChangePage: () => console.warn('No[handle change page] Callback defined'),
	handleChangeRowsPerPage: () => console.warn('No[handle change rows per page] Callback defined'),
}
export default TimesheetsTable
