import React, { Fragment, useState } from 'react'
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableSortLabel,
	Typography,
	Collapse,
	IconButton,
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

import propTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { tableConfigProps } from './config-prop-types'
import moment from 'moment'
import { currencyFormat, numberFormat } from '../../../helpers/currency-helper'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterMenu from './filters/menu-filter/filter-menu'
/** Datagrid component */
const DataGrid = ({
	headers,
	data,
	sortCriteria,
	sortDirection,
	onchangeSorting,
	noWrap,
	maxHeight,
	isLoading,
}) => {
	var visibleHeaders = headers.filter((x) => x.visible !== false)
	let emptyArray = Array.from(Array(10).keys()).map(() => null)

	return (
		<TableContainer style={{ maxHeight }}>
			<Table stickyHeader size={'small'}>
				<TableHead>
					<TableRow>
						{visibleHeaders.map((header) => {
							return (
								<DagridTableHead
									key={uuidv4()}
									{...header}
									sortCriteria={sortCriteria}
									sortDirection={sortDirection}
									onchangeSorting={onchangeSorting}
								/>
							)
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{isLoading
						? emptyArray.map(() => {
								return (
									<TableRow key={uuidv4()}>
										{visibleHeaders.map(() => {
											return (
												<TableCell key={uuidv4()}>
													<Skeleton animation='wave' />
												</TableCell>
											)
										})}
									</TableRow>
								)
						  })
						: data.map((item) => {
								return (
									<Fragment key={uuidv4()}>
										<TableRow key={uuidv4()}>
											{visibleHeaders.map((header) => {
												return (
													<DatagridTableCell
														key={uuidv4()}
														config={header}
														item={item}
														property={header.dataSource}
														noWrap={noWrap}
													/>
												)
											})}
										</TableRow>
									</Fragment>
								)
						  })}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
DataGrid.propTypes = {
	/**
	 * The data displayed in the table
	 */
	data: propTypes.arrayOf(propTypes.object).isRequired,

	/**
	 * The configuration of the tables
	 */
	headers: propTypes.arrayOf(tableConfigProps),
	sortCriteria: propTypes.string,
	sortDirection: propTypes.oneOf(['asc', 'desc']),
	onchangeSorting: propTypes.func,
	dense: propTypes.bool,
	maxHeight: propTypes.any,
}
DataGrid.defaultPropTypes = {
	data: [],
	headers: [],
	dense: false,
}

/**
 * Datagrid table head
 */
const DagridTableHead = ({
	title,
	dataSource,
	sortable,
	sortCriteria,
	sortDirection,
	onchangeSorting,
	filterType,
}) => {
	const criteria = sortCriteria || ''
	const isSortable = sortable || false
	const direction = sortDirection || 'asc'
	const isSortCriteria = criteria === dataSource

	const createSortHandler = (property) => () => {
		var sortDirection = direction === 'asc' ? 'desc' : 'asc'
		if (onchangeSorting) onchangeSorting(property, sortDirection)
	}

	const [filterSettings, setFilterSettings] = useState({
		open: false,
		handleClose: null,
		anchorEl: null,
	})
	const openContextMenu = (event) => {
		setFilterSettings((prevState) => ({
			...prevState,
			open: true,
			handleClose: handleClose,
			anchorEl: event.currentTarget,
		}))
	}
	const handleClose = () => {
		setFilterSettings((prevState) => ({
			...prevState,
			open: false,
			anchorEl: null,
		}))
	}

	return (
		<TableCell variant='head' sx={{ zIndex: '100', bgcolor: 'background.light' }}>
			{isSortable ? (
				<TableSortLabel
					active={isSortCriteria}
					direction={direction}
					onClick={createSortHandler(dataSource)}
				>
					<Typography component='span' variant='subtitle2' color='secondary.dark'>
						{title}
					</Typography>

					<IconButton onClick={openContextMenu}>
						{<FilterListIcon fontSize='small' />}
					</IconButton>
				</TableSortLabel>
			) : (
				<>
					<Typography component='span' variant='subtitle2' color='secondary.dark'>
						{title}
					</Typography>
					<IconButton onClick={openContextMenu}>
						{<FilterListIcon fontSize='small' />}
					</IconButton>
				</>
			)}
			<FilterMenu
				filterTypeActive={filterType}
				{...filterSettings}
				title={title}
				dataSource={dataSource}
				//	onRenderFilterOptions={filtering.onRenderFilterOptions}
			/>
		</TableCell>
	)
}

/**
 * Datagrid table cell
 */
const DatagridTableCell = ({ config, item, property }) => {
	var localDataType = config.dataType || 'string'
	const onRenderItem = config.onRenderProperty

	const getFormatedValue = (value) => {
		switch (localDataType) {
			case 'string':
				return value
			case 'date':
				return value ? moment(value).format('DD/MM/YYYY') : ''
			case 'currency':
				return currencyFormat(value)
			case 'number':
				return numberFormat(value)
			default:
				return value
		}
	}
	if (onRenderItem) {
		return (
			<TableCell>
				<Typography component='span' variant='caption'>
					{onRenderItem(item)}
				</Typography>{' '}
			</TableCell>
		)
	}
	var value = item[property]
	return (
		<TableCell>
			<Typography component='span' variant='caption'>
				{getFormatedValue(value)}
			</Typography>{' '}
		</TableCell>
	)
}

export default DataGrid
