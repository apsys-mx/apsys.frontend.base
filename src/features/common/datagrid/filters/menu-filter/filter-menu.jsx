import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
/** Redux imports section */
import { useDispatch } from 'react-redux'

/** MUI imports section */
import {
	Button,
	Divider,
	LinearProgress,
	ListItemButton,
	Popover,
	Typography,
	Box,
	Stack,
	TextField,
	Paper,
} from '@mui/material'

/** Resources imports section */
import * as styles from './menu-filters-styles'
import { convertFiltersToString, parseFiltersFromQueryString } from '../helper/url-helper'
//import { setFilter } from '../../../store/timesheets-view-slice'
//import { useGetCatalogsQuery } from '../../../store/search-api-slice'
import Select from 'react-select'
import FilterDate from './filterType/filter-date'
import FilterEquals from './filterType/filter-equals'
import { optionsSelector } from '../helper/filter-helper'
import moment from 'moment'

const FilterMenu = (props) => {
	const { id, open, anchorEl, handleClose, dataSource, filterTypeActive } = props
	const filterType = open ? filterTypeActive : ''
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const [valueDate, setValue] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	])
	//TODO: envar solo listado de catalogos para mistrar
	// Refactorizar para enviar información base
	const [allOptions, setAllOptions] = useState([])
	//const { data: allOptions } = useGetCatalogsQuery(dataSource)
	/** Defines local state */
	const [displayedOptions, setDisplayedOptions] = useState([])
	const [selectedOptions, setSelectedOptions] = useState([])
	const [selectType, setSelectType] = useState({ value: 'equal', label: 'Igual a' })
	const [selectTextfield, setSelectTextfield] = useState('')
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [filtersType, setFiltersType] = useState({
		open: false,
		handleClose: null,
		anchorEl: null,
	})

	/** Filtering displayed options on search input change  */
	useEffect(() => {
		let filteredOptions
		if (open && !!query) {
			filteredOptions = allOptions.filter(
				(opt) =>
					opt.description && opt.description.toLowerCase().includes(query.toLowerCase())
			)
		} else {
			filteredOptions = allOptions
		}
		setDisplayedOptions(filteredOptions)
	}, [query, allOptions, open])

	useEffect(() => {
		if (location.search === '') setSelectedOptions([])
	}, [location.search])

	const toggleSelectedOption = (event) => {
		const { checked } = event.target
		const optCode = event.target.getAttribute('data-code')
		const option = allOptions.find((opt) => opt.code === optCode)
		if (!option) {
			return
		}

		if (checked) {
			setSelectedOptions([...selectedOptions, option])
		} else {
			setSelectedOptions(selectedOptions.filter((opt) => opt.code !== option.code))
		}
	}

	const isOptionSelected = (optCode) => {
		return selectedOptions.some((opt) => opt.code === optCode)
	}

	const valuesSelect = () => {
		if (selectType.value === 'equal') return selectedOptions.map((x) => x.code)
		else return [selectTextfield]
	}

	/** Hanldes applying filter action */
	const applyFilter = () => {
		handleClose()
		if (filterType === 'date') {
			const newFilter = {
				fieldName: dataSource,
				relationalOperatorType: filterType,
				values: [
					moment(valueDate[0].startDate).format('YYYY-MM-DD'),
					moment(valueDate[0].endDate).format('YYYY-MM-DD'),
				],
			}
			let currentFilters = parseFiltersFromQueryString(location.search)
			currentFilters = currentFilters.filter((f) => f.fieldName !== dataSource)
			currentFilters.push(newFilter)
			const queryString = convertFiltersToString(currentFilters)
			navigate(`?${queryString}`)
		} else {
			const newFilter = {
				fieldName: dataSource,
				relationalOperatorType: selectType.value,
				values: valuesSelect(),
			}

			let currentFilters = parseFiltersFromQueryString(location.search)
			//dispatch(setFilter(currentFilters))
			currentFilters = currentFilters.filter((f) => f.fieldName !== dataSource)
			currentFilters.push(newFilter)
			const queryString = convertFiltersToString(currentFilters)
			navigate(`?${queryString}`)
		}
	}

	/** Handles removing filter action */
	const removeFilter = () => {
		handleClose()
		let currentFilters = parseFiltersFromQueryString(location.search)
		currentFilters = currentFilters.filter(
			(f) => f.fieldName !== dataSource[0] + dataSource.substring(1)
		)
		const queryString = convertFiltersToString(currentFilters)
		navigate(`?${queryString}`)
		setSelectedOptions([])
		setDisplayedOptions([])
		setQuery('')
		//dispatch(setFilter(currentFilters))
	}

	return (
		<Popover
			sx={styles.filterContainer}
			id={id}
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
		>
			<Paper sx={styles.filterPaper}>
				<ListItemButton>
					<Typography variant='subtitle2' sx={styles.titlePopover}>
						Filtros de{' '}
						{filterType === 'date'
							? 'Fecha'
							: filterType === 'numeric'
							? 'número'
							: 'texto'}
					</Typography>
				</ListItemButton>
				{filterType !== 'date' && (
					<Box>
						<Select
							classNamePrefix='Que contengan'
							options={optionsSelector(filterType)}
							defaultValue={selectType}
							onChange={(event) => setSelectType(event)}
							styles={{
								menu: (base) => ({ ...base, zIndex: 10, maxHeight: 200 }),
								menuList: (base) => ({
									...base,
									maxHeight: 200,
									paddingTop: 0,
								}),
								menuPortal: (base) => ({ ...base, zIndex: 9999 }), /// THIS IS TO SHOW MENU OVER MODAL
							}}
							menuPosition='fixed'
						/>

						<Divider />
						{loading && <LinearProgress />}

						{selectType.value === 'equal' && (
							<FilterEquals
								allOptions={allOptions}
								setQuery={setQuery}
								displayedOptions={displayedOptions}
								isOptionSelected={isOptionSelected}
								toggleSelectedOption={toggleSelectedOption}
							/>
						)}
						{selectType.value !== 'equal' && (
							<Box sx={styles.filterPadding}>
								<TextField
									size={'small'}
									label={'Lo siguiente...'}
									onChange={(event) => setSelectTextfield(event.target.value)}
								></TextField>
							</Box>
						)}
					</Box>
				)}

				{filterType === 'date' && <FilterDate valueDate={valueDate} setValue={setValue} />}

				<Stack>
					<Button
						variant='text'
						sx={styles.stylesTextButton}
						onClick={removeFilter}
						disabled={allOptions === undefined || loading ? true : false}
					>
						Limpiar filtro
					</Button>
					<Button
						variant='contained'
						sx={styles.stylesButton}
						onClick={applyFilter}
						disabled={allOptions === undefined || loading ? true : false}
					>
						Aplicar filtro
					</Button>
				</Stack>
			</Paper>
		</Popover>
	)
}

FilterMenu.propTypes = {
	dataSource: PropTypes.string.isRequired,
}

export default FilterMenu
