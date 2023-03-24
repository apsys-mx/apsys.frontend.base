import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'

/** Redux imports section */
import { useDispatch } from 'react-redux'
//import { fleetOperations } from '../../../store/fleet/Index'

/** MUI imports section */
import {
	Button,
	Checkbox,
	Divider,
	LinearProgress,
	ListItemButton,
	Popover,
	Typography,
	Box,
	Stack,
	TextField,
} from '@mui/material'

/** Custom components import section */
//import ContextFilterSubMenu from './filter-sub-menu'
//import DialogFilter from './dialog-filter'
import SearchBox from './search-box'

/** Resources imports section */
import * as classes from './menu-filters-styles'
import { convertFiltersToString, parseFiltersFromQueryString } from '../helper/url-helper'
//import { setFilter } from '../../../store/timesheets-view-slice'
//import { useGetCatalogsQuery } from '../../../store/search-api-slice'
import Select from 'react-select'

const FilterMenu = (props) => {
	const { id, open, anchorEl, handleClose, dataSource, filterTypeActive } = props
	const filterType = open ? filterTypeActive : ''
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()

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
	const [DialogType, setDialogType] = useState({
		open: false,
		handleClose: null,
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

	// useEffect(() => {
	// 	if (location.search === '') setSelectedOptions([])
	// }, [location.search])

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

	//** submenu for filter types */
	const openContextMenuType = (event) => {
		setFiltersType((prevState) => ({
			...prevState,
			open: true,
			handleClose: handleCloseMenuType,
			anchorEl: event.currentTarget,
			type: filterType,
			dataSource: dataSource,
		}))
	}

	const handleCloseMenuType = () => {
		setFiltersType((prevState) => ({
			...prevState,
			open: false,
			anchorEl: null,
		}))
	}

	//** Dialog for filter types */
	const openContextDialogType = (event) => {
		setDialogType((prevState) => ({
			...prevState,
			open: true,
			handleClose: handleCloseDialogType,
			type: filterType,
			filter: event.target.outerText,
			dataSource: dataSource,
			filterType: 'between',
		}))
	}

	const handleCloseDialogType = () => {
		handleClose(false)
	}

	return (
		<Popover
			className={classes.filterContainer}
			id={id}
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
		>
			<Box className={classes.filterPaper}>
				<ListItemButton
					onClick={filterType === 'date' ? openContextDialogType : openContextMenuType}
				>
					<Typography variant='subtitle2' className={classes.titlePopover}>
						Filtros de{' '}
						{filterType === 'date'
							? 'Fecha'
							: filterType === 'numeric'
							? 'número'
							: 'texto'}
					</Typography>
				</ListItemButton>

				<Typography>Filtrar</Typography>
				<Divider />
				<Select
					classNamePrefix='Que contengan'
					options={[]}
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

				{loading && <LinearProgress />}
				{selectType.value === 'equal' && (
					<Box>
						{/* {allOptions !== undefined && ( */}
						<SearchBox
							autoFocus
							autoSearch
							placeholder={'Buscar'}
							onChange={(value) => setQuery(value)}
						/>
						{/* )} */}
						<div className={classes.filterItem}>
							{displayedOptions?.map((a) => {
								return (
									<Stack spacing={3}>
										<Stack
											direction={'row'}
											alignItems={'center'}
											key={a.code}
											className={classes.checkList}
										>
											<Checkbox
												size='small'
												className={classes.checkFilter}
												style={{ zIndex: 100 }}
												inputProps={{
													'data-code': a.code,
												}}
												onChange={toggleSelectedOption}
												checked={isOptionSelected(a.code)}
											/>
											<Typography variant='caption'>
												{a.description}
											</Typography>
										</Stack>
									</Stack>
								)
							})}
						</div>
					</Box>
				)}
				{selectType.value !== 'equal' && (
					<Box className={classes.filterPadding}>
						<TextField
							size={'small'}
							label={'Lo siguiente...'}
							onChange={(event) => setSelectTextfield(event.target.value)}
						></TextField>
					</Box>
				)}

				<Stack>
					<Button
						variant='text'
						className={classes.stylesButton}
						onClick={removeFilter}
						disabled={allOptions === undefined || loading ? true : false}
					>
						Limpiar filtro
					</Button>
					<Button
						variant='contained'
						className={classes.stylesButton}
						onClick={applyFilter}
						disabled={allOptions === undefined || loading ? true : false}
					>
						Aplicar filtro
					</Button>
				</Stack>
			</Box>
			{/* <ContextFilterSubMenu {...filtersType} /> */}
			{/* <DialogFilter {...DialogType} onClose={() => console.log('Close')} /> */}
		</Popover>
	)
}

FilterMenu.propTypes = {
	dataSource: PropTypes.string.isRequired,
}

export default FilterMenu
