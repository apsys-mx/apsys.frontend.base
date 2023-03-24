import React, { useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
/** MUI imports section */
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
//import TextfieldComponent from '../../components/text-fields/text-field-component'
//import { DateRange } from 'react-date-range'
//import 'react-date-range/dist/styles.css' // main style file
//import 'react-date-range/dist/theme/default.css' // theme css file

/** Redux imports section */
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

/** Resources imports section */
import { convertFiltersToString, parseFiltersFromQueryString } from '../helper/url-helper'
//import { setFilter } from '../../../store/timesheets-view-slice'

const DialogFilter = (props) => {
	const { open, handleClose, type, filter, dataSource, subClose, filterType } = props
	const location = useLocation()
	const [valueDate, setValue] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	])
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm()

	const applyFilterDate = (Filters) => {
		handleClose()
		//dispatch(setFilter(Filters))
		const queryString = convertFiltersToString(Filters)
		navigate(`?${queryString}`)
	}

	const onSubmit = (data) => {
		if (type !== 'DATE') {
			handleClose()
			subClose()
			const newFilter = {
				fieldName: dataSource,
				relationalOperatorType: filterType,
				values: [data.value],
			}
			let currentFilters = parseFiltersFromQueryString(location.search)
			currentFilters = currentFilters.filter((f) => f.fieldName !== dataSource)
			currentFilters.push(newFilter)
			const queryString = convertFiltersToString(currentFilters)
			navigate(`?${queryString}`)
			localStorage.setItem('SearchInquiryFilterName', 'Filtro personalizado')
		}
		if (type === 'DATE') {
			handleClose()
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
			localStorage.setItem('SearchInquiryFilterName', 'Filtro personalizado')
			applyFilterDate(currentFilters)
		}
	}
	return (
		<Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
			<form onSubmit={handleSubmit((data) => onSubmit(data))}>
				<DialogTitle>
					FILTRO PERSONALIZADO
					<IconButton
						aria-label='close'
						onClick={handleClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: 'red',
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					{type === 'TEXT' && (
						<div>
							<Typography variant='subtitle2'>Texto</Typography>
							{/* <TextfieldComponent
								fullWidth
								control={control}
								name='value'
								rules={{
									required: { value: false },
								}}
								errors={errors}
							/> */}
						</div>
					)}
					{type === 'NUMERIC' && (
						<div>
							<Typography variant='subtitle2'>{filter}</Typography>
							<TextfieldComponent
								fullWidth
								control={control}
								name='value'
								rules={{
									required: { value: false },
								}}
								errors={errors}
								type='number'
							/>
						</div>
					)}
					{type === 'DATE' && (
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							{/* <DateRange
								editableDateInputs={true}
								moveRangeOnFirstSelection={false}
								ranges={valueDate}
								onChange={(item) => setValue([item.selection])}
							/> */}
						</div>
					)}
				</DialogContent>
				<DialogActions>
					<Button type='submit' variant='contained'>
						Aplicar
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

export default DialogFilter
