import React, { useTransition } from 'react'
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableSortLabel,
	Typography,
	IconButton,
	Box,
	Skeleton,
} from '@mui/material'
import propTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { tableConfigProps } from './config-prop-types'
import moment from 'moment'
import currency from 'currency.js'
import defaultTheme from '../../../assets/themes/default.theme'
import CheckTable from './check-table'
import { FilterAlt } from '@mui/icons-material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const DataGrid = ({
	headers,
	data,
	sortCriteria,
	sortDirection,
	onchangeSorting,
	dense,
	noWrap,
	minHeight,
	maxHeight,
	onFilterButtonClick,
	isFetching,
	emptyTemplate,
	filters,
	dictionaryTranlation,
	isTranslatable,
}) => {
	var visibleHeaders = headers.filter((x) => x.visible !== false)

	const hasFilter = (dataSource) => {
		var filtered = filters.find((x) => x === dataSource)
		return filtered ? true : false
	}

	const getTableRows = () => {
		if (data.length === 0) {
			return (
				<TableRow key={uuidv4()}>
					<TableCell colSpan={headers.length} key={uuidv4()}>
						{emptyTemplate ? emptyTemplate : null}
					</TableCell>
				</TableRow>
			)
		} else {
			return data.map((item) => {
				return (
					<TableRow key={uuidv4()}>
						{visibleHeaders.map((header) => {
							return (
								<DatagridTableCell
									key={uuidv4()}
									config={header}
									item={item}
									property={header.dataSource}
									noWrap={noWrap}
									isFetching={isFetching}
								/>
							)
						})}
					</TableRow>
				)
			})
		}
	}

	return (
		<TableContainer style={{ minHeight: minHeight, maxHeight: maxHeight }}>
			<Table size={dense === true ? 'small' : ''} stickyHeader={true}>
				<TableHead>
					<TableRow>
						{visibleHeaders.map((header) => {
							return (
								<DagridTableHead
									key={header.dataSource}
									{...header}
									sortCriteria={sortCriteria}
									sortDirection={sortDirection}
									onchangeSorting={onchangeSorting}
									onFilterButtonClick={onFilterButtonClick}
									noWrap={noWrap}
									hasFilter={hasFilter(header.dataSource)}
									dictionaryTranlation={dictionaryTranlation}
									isTranslatable={isTranslatable}
								/>
							)
						})}
					</TableRow>
				</TableHead>

				<TableBody>{getTableRows()}</TableBody>
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
	noWrap: propTypes.bool,
	maxHeight: propTypes.any,
	onFilterButtonClick: propTypes.func,
	filters: propTypes.arrayOf(propTypes.string).isRequired,
	dictionaryTranlation: propTypes.string,
	isTranslatable: propTypes.bool,
}
DataGrid.defaultProps = {
	data: [],
	headers: [],
	dense: false,
	noWrap: false,
	filters: [],
	dictionaryTranlation: '',
	isTranslatable: false,
	onFilterButtonClick: () => console.warn('No [onFilterButtonClick] callback'),
}

/**
 * Datagrid table head
 */
const DagridTableHead = ({
	title,
	isCheck,
	dataSource,
	sortable,
	sortCriteria,
	sortDirection,
	onchangeSorting,
	stick,
	isActiveFilter,
	onFilterButtonClick,
	noWrap,
	hasFilter,
	width,
	dictionaryTranlation,
	isTranslatable,
}) => {
	const [showFilter, setShowFilter] = useState(false)
	const criteria = sortCriteria || ''
	const isSortable = sortable || false
	const direction = sortDirection || 'asc'
	const isSortCriteria = criteria === dataSource
	const { t } = useTranslation()
	const Stick = stick ? stick : false

	const createSortHandler = (property) => () => {
		var sortDirection = direction === 'asc' ? 'desc' : 'asc'
		if (onchangeSorting) onchangeSorting(property, sortDirection)
	}

	const getFilterButtonStyle = () => {
		if (hasFilter)
			return {
				visibility: '',
				color: 'primary.light',
			}
		else
			return {
				visibility: showFilter ? '' : 'hidden',
			}
	}

	return (
		<TableCell
			sx={[
				Stick
					? {
							position: 'sticky',
							top: '0',
							left: '0',
					  }
					: {
							zIndex: 10,
					  },
			]}
			onMouseOver={() => setShowFilter(true)}
			onMouseLeave={() => setShowFilter(false)}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: width ? width : null,
				}}
			>
				<Typography
					variant='h7'
					color={defaultTheme.palette.primary.dark}
					noWrap={noWrap}
					sx={{ display: 'flex' }}
				>
					{isTranslatable ? t(`${title}`, { ns: `${dictionaryTranlation}` }) : title}
					{isSortable && (
						<TableSortLabel
							active={isSortCriteria}
							direction={direction}
							onClick={createSortHandler(dataSource)}
						></TableSortLabel>
					)}
				</Typography>
				<Box>
					{isActiveFilter && (
						<IconButton
							size='small'
							onClick={(event) => onFilterButtonClick(event, dataSource)}
							sx={getFilterButtonStyle()}
						>
							<FilterAlt size='small' />
						</IconButton>
					)}
					{dataSource === 'check' && (
						<CheckTable
							isCheck={isCheck}
							checkValueName={'AllCheck'}
							isIndeterminate={false}
						/>
					)}
				</Box>
			</Box>
		</TableCell>
	)
}
DagridTableHead.protoTypes = {
	onFilterButtonClick: propTypes.func.isRequired,
	hasFilter: propTypes.bool.isRequired,
}
DagridTableHead.defaultProps = {
	onFilterButtonClick: () => console.warn('No [onFilterButtonClick] callback defined'),
	hasFilter: false,
}

/**
 * Datagrid table cell
 */
const DatagridTableCell = ({ config, item, property, noWrap, isFetching, hasFilter }) => {
	var localDataType = config.dataType || 'string'
	const onRenderItem = config.onRenderItem
	const stick = config.stick
	const getFormatedValue = (value) => {
		switch (localDataType) {
			case 'string':
				return value
			case 'date':
				return value ? moment(value).format('DD/MMM/YYYY') : ''
			case 'currency':
				return currency(value).format()
			default:
				return value
		}
	}

	if (isFetching) {
		return (
			<TableCell key={uuidv4()}>
				<Skeleton variant='text' sx={{ fontSize: '1rem' }} />
			</TableCell>
		)
	}

	if (onRenderItem) {
		return <TableCell key={uuidv4()}>{onRenderItem(item)}</TableCell>
	}
	var value = item[property]
	if (stick) {
		return (
			<TableCell
				sx={{
					backgroundColor: 'white',
					position: 'sticky',
					top: '0',
					left: '0',
				}}
				key={uuidv4()}
			>
				<Typography variant='body2' noWrap={noWrap}>
					{getFormatedValue(value)}
				</Typography>{' '}
			</TableCell>
		)
	}
	return (
		<TableCell key={uuidv4()}>
			<Typography variant='body2' noWrap={noWrap}>
				{getFormatedValue(value)}
			</Typography>{' '}
		</TableCell>
	)
}

export default DataGrid
