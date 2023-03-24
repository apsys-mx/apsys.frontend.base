import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

/** Redux imports section */
import { useDispatch } from 'react-redux'

/** MUI imports section */
import { ListItemButton, Popover, Typography } from '@mui/material'

/** Resources imports section */
import {
	getRelationalOperatorsForNumber,
	getRelationalOperatorsForString,
} from '../helper/filter-helper'
import DialogFilter from './dialog-filter'

const FilterSubMenu = (props) => {
	const { open, anchorEl, handleClose, type, dataSource } = props
	const dispatch = useDispatch()
	const [relationalOperators, setRelationalOperators] = useState([])
	const [DialogType, setDialogType] = useState({
		open: false,
		handleClose: null,
	})

	useEffect(() => {
		if (open) {
			if (type === 'TEXT') {
				setRelationalOperators(getRelationalOperatorsForString())
			} else if (type === 'NUMERIC') {
				setRelationalOperators(getRelationalOperatorsForNumber())
			}
		}
	}, [dispatch, open, type])

	const openContextDialogType = (event) => {
		const Index = relationalOperators?.findIndex((i) => i[1] === event.target.outerText)
		setDialogType((prevState) => ({
			...prevState,
			open: true,
			handleClose: handleCloseDialogType,
			type: type,
			filter: event.target.outerText,
			dataSource: dataSource,
			subClose: handleClose,
			filterType: relationalOperators[Index][0],
		}))
	}
	const handleCloseDialogType = () => {
		setDialogType((prevState) => ({
			...prevState,
			open: false,
		}))
	}
	return (
		<>
			{type !== 'DATE' && (
				<>
					<Popover
						id={'poper'}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'start',
							horizontal: 'right',
						}}
					>
						{relationalOperators?.map(
							(item) =>
								item[0] !== 'equal' && (
									<ListItemButton
										key={item[0].key}
										onClick={openContextDialogType}
									>
										<Typography variant='subtitle2'>{item[1]}</Typography>
									</ListItemButton>
								)
						)}
					</Popover>
					<DialogFilter {...DialogType} />
				</>
			)}
		</>
	)
}
FilterSubMenu.propTypes = {
	type: PropTypes.string.isRequired,
}

export default FilterSubMenu
