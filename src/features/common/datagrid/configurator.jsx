import React, { Fragment } from 'react'
import { Box } from '@mui/system'
import propTypes from 'prop-types'
import {
	IconButton,
	List,
	ListItem,
	ListItemText,
	ButtonGroup,
	Typography,
	Button,
	ListItemIcon,
} from '@mui/material'
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Switch from '@mui/material/Switch'
import { tableConfigProps } from './config-prop-types'
import * as styles from './configurator.styles'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Popover from '@mui/material/Popover'
import { Translate } from 'react-localize-redux'
import SettingsIcon from '@mui/icons-material/Settings'
import { useEffect } from 'react'

/**
 * Datagrid configurator
 */
const Configurator = ({ config = [], onSave, onReset }) => {
	/**
	 * button settings
	 */
	const [anchorEl, setAnchorEl] = React.useState(null)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined
	/**
	 * menu
	 */
	const [localConfig, setLocalConfig] = useState([...config])
	useEffect(() => {
		if (config) {
			var local = config.map((c) => {
				return { ...c }
			})
			setLocalConfig(local)
		}
	}, [config])

	const moveOption = (option, from, to) => {
		let updated = [...localConfig]
		updated.splice(to, 0, updated.splice(from, 1)[0])
		setLocalConfig(updated)
	}

	const onDragEnd = (result) => moveOption(null, result.source.index, result.destination.index)
	/**
	 * Update visible option
	 */
	const visibleOption = (isVisible, option) => {
		const upDated = localConfig.map((data) => {
			const updateData = { ...data }
			if (data.dataSource === option.dataSource) updateData.visible = isVisible
			return updateData
		})
		setLocalConfig(upDated)
	}
	const onResetOption = () => {
		onReset()
	}
	return (
		<Fragment>
			<IconButton sx={styles.butttonSettings} aria-describedby={id} onClick={handleClick}>
				<SettingsIcon />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				sx={styles.popoverContainer}
			>
				<Box sx={styles.titleContent}>
					<Typography variant='subtitle1' sx={styles.titleConfig}>
						<Translate id={'table-settings'} />
					</Typography>
				</Box>
				<DragDropContext onDragEnd={onDragEnd}>
					<Box component='div' sx={styles.mainContainer}>
						<Droppable key={uuidv4()} droppableId='droppable-list-id'>
							{(provided) => (
								<List
									component='div'
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{localConfig.map((option) => {
										const indexOf = localConfig.indexOf(option)
										const isUpDisabled = indexOf === 0 ? true : false
										const isDownDisabled =
											indexOf === localConfig.length - 1 ? true : false
										return (
											<ConfigOption
												key={option.dataSource}
												configOption={option}
												isUpDisabled={isUpDisabled}
												isDownDisabled={isDownDisabled}
												onMoveDown={() =>
													moveOption(option, indexOf, indexOf + 1)
												}
												onMoveUp={() =>
													moveOption(option, indexOf, indexOf - 1)
												}
												index={indexOf}
												visibleOption={(isVisible, option) =>
													visibleOption(isVisible, option)
												}
											/>
										)
									})}
									{provided.placeholder}
								</List>
							)}
						</Droppable>
					</Box>
				</DragDropContext>
				<Box sx={styles.saveAndResetContainer}>
					<Button
						fullWidth
						onClick={() => {
							onSave(localConfig)
							handleClose()
						}}
					>
						<Translate id='save' />
					</Button>
					<Button
						fullWidth
						onClick={() => {
							onResetOption()
							handleClose()
						}}
					>
						<Translate id='reset' />
					</Button>
				</Box>
			</Popover>
		</Fragment>
	)
}
Configurator.propTypes = {
	config: propTypes.arrayOf(tableConfigProps),
	onSave: propTypes.func.isRequired,
	onReset: propTypes.func,
}
Configurator.defaultProps = {
	config: [],
	onSave: () => console.warn('No [onSave] callback has been define'),
	onReset: () => console.warn('No [onReset] callback has been define'),
}
const ConfigOption = ({
	configOption,
	onMoveUp,
	onMoveDown,
	isUpDisabled,
	isDownDisabled,
	index,
	visibleOption,
}) => {
	return (
		<Draggable
			draggableId={configOption?.dataSource}
			key={configOption?.dataSource}
			index={index}
			mode='virtual'
		>
			{(provided) => (
				<ListItem
					sx={styles.configItem}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					secondaryAction={
						<ButtonGroup size='small'>
							<IconButton disabled={isUpDisabled} onClick={onMoveUp}>
								<ArrowDropUp />
							</IconButton>
							<IconButton disabled={isDownDisabled} onClick={onMoveDown}>
								<ArrowDropDown />
							</IconButton>
						</ButtonGroup>
					}
				>
					<ListItemIcon>
						<Switch
							defaultChecked={configOption.visible}
							onChange={(event) => visibleOption(event.target.checked, configOption)}
						/>
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant='caption'>
								<Translate id={configOption.title} />
							</Typography>
						}
					/>
				</ListItem>
			)}
		</Draggable>
	)
}

ConfigOption.propTypes = {
	configOption: propTypes.object.isRequired,
	onMoveUp: propTypes.func,
	onMoveDown: propTypes.func,
	isUpDisabled: propTypes.bool,
	isDownDisabled: propTypes.bool,
	index: propTypes.number,
	visibleOption: propTypes.func,
}

ConfigOption.defaultProps = {
	configOption: null,
	onMoveUp: () => {
		console.warn('[onMoveUp] is not defined!')
	},
	onMoveDown: () => {
		console.warn('[onMoveDown] is not defined!')
	},
	isUpDisabled: false,
	isDownDisabled: false,
	index: 0,
	visibleOption: console.warn('[visibleOption] is not defined'),
}

export default Configurator
