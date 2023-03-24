## Add the Common folder

-   Crea carpeta de `common`
-   Adentro crea dos carpetas `datagrid` y `filters`

### Data Grid Configuration

-   instala:
-   uuidv4 `npm i uuidv4`
-   moment `npm i moment`
-   Crea un archivo en helper `currency-helper.jsx` con el codijo que se muestra a continuación

```javascript
// src\helpers\currency-helper.jsx
/**
 * Get currency format to a number
 *
 * @param {number} amount
 */
export const currencyFormat = (amount) => {
	let result = amount
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	return `${result ? formatter.format(result) : '-'}`
}

export const percentageFormated = (percentage) => {
	var option = {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}
	var formatter = new Intl.NumberFormat('en-US', option)
	var discountFormat = formatter.format(percentage)
	return discountFormat
}

export const numberFormat = (amount) => {
	const configurationNumber = {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}
	const numberFormat = new Intl.NumberFormat('en-US', configurationNumber)
	if (amount === 0) return '-'
	else return numberFormat.format(amount)
}

export const numberDecimalFormat = (amount) => {
	const configurationNumber = {
		minimumFractionDigits: 4,
		maximumFractionDigits: 10,
	}
	const numberFormat = new Intl.NumberFormat('en-US', configurationNumber)
	if (amount === 0) return '-'
	else return numberFormat.format(amount)
}
```

-   En la carpeta data-grid crea archivo de `config-prop-types.jsx` con el codijo que se muestra a continuación

```javascript
//src/features/common/datagrid
import propTypes from 'prop-types'

/**
 * Define the proptypes related to the datagrid configuration
 */
const tableConfigProps = propTypes.shape({
	title: propTypes.oneOfType([propTypes.string, propTypes.node]),
	dataSource: propTypes.string,
	sortable: propTypes.bool,
	onRenderItem: propTypes.func,
	width: propTypes.any,
	visible: propTypes.bool,
	dataType: propTypes.oneOf(['string', 'date', 'currency', 'number', null, undefined]),
})

export { tableConfigProps }
```

-   Crea el archivo de estilos `configurator.styles.jsx` con el codijo que se muestra a continuación

```javascript
//src/features/common/datagrid
import theme from '../../../resources/theme/default'

export const mainContainer = {
	marginTop: (theme) => theme.toolbarHeight,
	width: '300px',
	padding: '0px 8px 0px 8px',
	borderRadius: '8px',
	overflow: 'auto',
	maxHeight: '28vh',
}
export const butttonSettings = {
	color: theme.palette.primary.main,
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
}
export const popoverContainer = {
	height: '60vh',
}
export const configItem = {
	border: 1,
	borderColor: 'transparent',
	marginBottom: '8px',
	borderRadius: 2,
	backgroundColor: theme.palette.text.secondary,
}
export const saveAndResetContainer = {
	padding: '10px',
	backgroundColor: 'common.white',
	zIndex: '1',
	bottom: '0',
	position: 'sticky',
}
/**
 * title
 */
export const titleConfig = {
	color: theme.palette.primary.main,
	padding: '15px 10px 10px 10px',
}
export const titleContent = {
	display: 'flex',
	justifyContent: 'center',
}
```

-   Crea el archivo de estilos `data-grid.jsx` con el codijo que se muestra a continuación
-   Importa componentes con tu verción de materia

```javascript
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
	Collapse,
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import propTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { tableConfigProps } from './config-prop-types'
import moment from 'moment'
import { currencyFormat, numberFormat } from '../../../helpers/currency-helper'

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
	itemRender,
	componentDetail,
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
										{itemRender && itemRender.id === item.id && (
											<TableRow key={uuidv4()}>
												<TableCell colSpan={visibleHeaders.length}>
													<Collapse
														in={true}
														timeout='auto'
														unmountOnExit
													>
														{componentDetail}
													</Collapse>
												</TableCell>
											</TableRow>
										)}
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
}) => {
	const criteria = sortCriteria || ''
	const isSortable = sortable || false
	const direction = sortDirection || 'asc'
	const isSortCriteria = criteria === dataSource

	const createSortHandler = (property) => () => {
		var sortDirection = direction === 'asc' ? 'desc' : 'asc'
		if (onchangeSorting) onchangeSorting(property, sortDirection)
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
				</TableSortLabel>
			) : (
				<Typography component='span' variant='subtitle2' color='secondary.dark'>
					{title}
				</Typography>
			)}
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
```
