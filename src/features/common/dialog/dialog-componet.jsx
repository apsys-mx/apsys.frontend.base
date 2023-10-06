import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material'
import React from 'react'
import * as styles from './dialog-componet-styles'
import { Close } from '@mui/icons-material'

const DialogComponet = (props) => {
	const {
		open,
		close,
		onSave,
		isLoading,
		disabled,
		primaryAction,
		secondaryAction,
		action,
		content,
		title,
		icon
	} = props
	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<Box sx={styles.root}>
				<DialogTitle sx={styles.dialogTitle}>
					{icon}
					<div style={styles.titles}>
						<Typography variant='subtitle2' sx={styles.dialogTitleText}>{title} </Typography>
						<Typography variant='caption' sx={styles.dialogSubTitleText}>{title} </Typography>
					</div>
					<Close sx={styles.closeIcon} onClick={close}/>
				</DialogTitle>
				<DialogContent>
					<Typography variant='body2' sx={styles.content}>
						{content}
					</Typography>
					{action}
				</DialogContent>
				<DialogActions>
					<Button variant='secondary' style={styles.cancelButton} onClick={close}>
						{secondaryAction}
					</Button>
					<Button
						variant='primary'
						style={styles.acceptButton}
						onClick={onSave}
						disabled={isLoading || disabled}
					>
						{primaryAction}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	)
}

export default DialogComponet
