import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'

import { Box } from '@mui/material'

import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

import * as styles from './search.styles'

/**
 * SearchInput component
 */
const SearchInput = (props) => {
	const [value, setValue] = useState(props.value || '')
	const { placeholder} = props

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
	}

	return (
		<Box sx={styles.root}>
			<Box component='form' sx={styles.inputHolder} onSubmit={onSubmit}>
				<InputBase
					sx={styles.input}
					placeholder={placeholder}
					inputProps={{ 'aria-label': 'search' }}
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
				<IconButton type='submit' sx={styles.iconButton} aria-label='search'>
					<SearchIcon />
				</IconButton>
			</Box>
		</Box>
	)
}
SearchInput.propTypes = {
	/**
	 * The placeholder shown in the search box
	 */
	placeholder: propTypes.string,
	/**
	 * Initial searchbox value
	 */
	value: propTypes.string,
}
SearchInput.defaultProps = {
	placeholder: 'Buscar...'
}

export default SearchInput
