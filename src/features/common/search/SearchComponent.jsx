import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import propTypes from 'prop-types'

import { Box } from '@mui/material'

import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

import * as styles from './search.styles'
// import { setQuery } from '../../timesheets/timesheet-view.slice'

const SearchComponent = (props) => {
	const [value, setValue] = useState(props.value || '')
	const dispatch = useDispatch()

	/**
	 * Update the value when the props value change
	 */
	useEffect(() => {
		if (props.value) {
			setValue(props.value)
		}
	}, [props.value])

	/**
	 * On submit callback
	 */
	const onSubmit = (event) => {
		event.preventDefault()
		// dispatch(setQuery(value))
	}
	return (
		<div sx={styles.root}>
			<Box component='form' sx={styles.inputHolder} onSubmit={onSubmit}>
				<InputBase
					sx={styles.input}
					placeholder={'Buscar...'}
					inputProps={{ 'aria-label': 'search' }}
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
				<IconButton type='submit' sx={styles.iconButton} aria-label='search'>
					<SearchIcon />
				</IconButton>
			</Box>
		</div>
	)
}
SearchComponent.propTypes = {
	/**
	 * The placeholder shown in the search box
	 */
	placeholder: propTypes.string,
	/**
	 * Callback executed when the user press search
	 */
	onChange: propTypes.func.isRequired,
	/**
	 * Initial searchbox value
	 */
	value: propTypes.string,
}
SearchComponent.defaultProps = {
	onChange: () => console.warn('No [onChangeValue] callback defined'),
}

export default SearchComponent
