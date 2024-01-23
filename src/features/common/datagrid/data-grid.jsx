import React, { Fragment } from 'react'
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableSortLabel,
	Typography,
	Box,
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

import propTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { tableConfigProps } from './config-prop-types'
import moment from 'moment'
import { currencyFormat, numberFormat } from './helpers/currency-helper'

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
	const visibleHeaders = headers.filter((x) => x.visible !== false)
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
	headers: propTypes.arrayOf(tableConfigProps).isRequired,

	/**
	 * The name of the property sorted
	 */
	sortCriteria: propTypes.string,

	/**
	 * The sorting criteria 'asc' or 'desc'
	 */
	sortDirection: propTypes.oneOf(['asc', 'desc']),

	/**
	 * Callback executed when the sorting criteria button is pressed
	 */
	onchangeSorting: propTypes.func.isRequired,

	/**
	 * Determine if the table is shown in a dense (small) configuration
	 */
	dense: propTypes.bool,

	/**
	 * This property is used to set the max datagrid height. Use when the container has a defined height
	 */
	maxHeight: propTypes.any,

	/**
	 * Determine if the text in the colums use an ellipsis for large text 
	 */
	noWrap: propTypes.bool,

	/**
	 * Determine if the datagrid shows a 'loading' state
	 */
	isLoading: propTypes.bool.isRequired,

}
DataGrid.defaultPropTypes = {
	data: [],
	headers: [],
	dense: false,
	isLoading: false,
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
}) => {
	const criteria = sortCriteria || ''
	const isSortable = sortable || false
	const direction = sortDirection || 'asc'
	const isSortCriteria = criteria === dataSource

	const createSortHandler = (property) => () => {
		const sortDirection = direction === 'asc' ? 'desc' : 'asc'
		if (onchangeSorting) onchangeSorting(property, sortDirection)
	}

	return (
		<TableCell variant='head' sx={{ zIndex: '100', bgcolor: 'background.light' }}>
			<Box sx={{ display: 'flex' }}>
				{isSortable ? (
					<TableSortLabel
						active={isSortCriteria}
						direction={direction}
						onClick={createSortHandler(dataSource)}
					>
						<Typography component='span' variant='subtitle2' color='secondary.dark'>
							{title}
						</Typography>
					</TableSortLabel>
				) : (
					<Typography component='span' variant='subtitle2' color='secondary.dark'>
						{title}
					</Typography>
				)}
				
				{
				/* TODO: Implements filter button
					<IconButton onClick={openContextMenu}>
						{<FilterListIcon fontSize='small' />}
					</IconButton> 
				*/
				}
			</Box>
		</TableCell>
	)
}
DagridTableHead.propTypes = {

	/**
	 * The title show in the column header
	 */
	title: propTypes.string,

	/**
	 * The name of the item's property show in the column
	 */
	dataSource: propTypes.string,

	/**
	 * Determine if the column can be sorted
	 */
	sortable: propTypes.bool,

	/**
	 * The datagrid's sort criteria. Used to determine if the column must show the sorting control
	 */
	sortCriteria: propTypes.string,

	/**
	 * The datagrid's sort direction
	 */
	sortDirection: propTypes.string,

	/**
	 * Callback executed when the sorting criteria button is pressed
	 */
	onchangeSorting: propTypes.func,
}

/**
 * Datagrid table cell
 */
const DatagridTableCell = ({ config, item, property }) => {
	const localDataType = config.dataType || 'string'
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
	const value = item[property]
	return (
		<TableCell>
			<Typography component='span' variant='caption'>
				{getFormatedValue(value)}
			</Typography>{' '}
		</TableCell>
	)
}
DatagridTableCell.propTypes = {

	/**
	 * The configuration of the value to render
	 * dataType: 'string', 'date', 'currency', 'number'
	 */
	config: propTypes.shape({
		dataType: propTypes.string,
		onRenderProperty: propTypes.func
	}),

	/**
	 * The item to render
	 */
	item: propTypes.object.isRequired,

	/**
	 * The item's property to render
	 */
	property: propTypes.string.isRequired
}

export default DataGrid
