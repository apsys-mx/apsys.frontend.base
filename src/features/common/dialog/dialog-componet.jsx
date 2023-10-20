import React from 'react'
import propTypes from 'prop-types'

import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import * as styles from './dialog-componet-styles'

const DialogComponet = (props) => {
	//Function props
	const { close, primaryAction } = props
	//Title Props
	const { title, subtitle, primaryActionTitle, secondaryActionTitle } = props
	//Bool props
	const { open, disabled } = props
	//Content Props
	const { children, contentTitle } = props
	//Icon
	const { icon } = props
	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<Box sx={styles.root}>
				<Box sx={styles.dialogTitle}>
					{icon}
					<div style={styles.titles}>
						<Typography variant='subtitle2' sx={styles.dialogTitleText}>
							{title}{' '}
						</Typography>
						<Typography variant='caption' sx={styles.dialogSubTitleText}>
							{subtitle}{' '}
						</Typography>
					</div>
					<Close sx={styles.closeIcon} onClick={close} />
				</Box>
				<DialogContent>
					<Typography variant='body2' sx={styles.content}>
						{contentTitle}
					</Typography>
					{children}
				</DialogContent>
				<DialogActions>
					<Button
						variant='secondary'
						disabled={disabled}
						style={styles.cancelButton}
						onClick={close}
					>
						{secondaryActionTitle}
					</Button>
					<Button
						variant='primary'
						style={styles.acceptButton}
						onClick={primaryAction}
						disabled={disabled}
					>
						{primaryActionTitle}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	)
}
DialogComponet.propTypes = {
	open: propTypes.bool.isRequired,
	close: propTypes.func.isRequired,
	title: propTypes.string.isRequired,
	primaryAction: propTypes.func.isRequired,
	primaryActionTitle: propTypes.string.isRequired,
	secondaryActionTitle: propTypes.string.isRequired,
	subtitle: propTypes.string,
	contentTitle: propTypes.string,
	isLoading: propTypes.bool,
	disabled: propTypes.bool,
}
DialogComponet.defaultProps = {
	title: '',
	primaryActionTitle: '',
	secondaryActionTitle: '',
	disabled: false,
	open: false,

	close: () => {
		console.warn('close callback not defined')
	},
	primaryAction: () => {
		console.warn('primary Action callback not defined')
	},
}
export default DialogComponet
