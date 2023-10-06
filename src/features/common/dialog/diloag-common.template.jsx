import React from 'react'
import propTypes from 'prop-types'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Dialog,
	Stack,
	Typography,
} from '@mui/material'
import * as styles from './diloag-common.styles'
import { useIsIsMobile } from '../../hooks/use-is-mobile'
const DialogCommonTemplate = ({
	icon,
	title,
	subtitle,
	message1,
	message2,
	primaryButton,
	secondButton,
	open,
	setOpenDialog,
	loadingAction,
	onPrimaryAction,
	isDisablePrimaryAction,
}) => {
	var isMobile = useIsIsMobile()
	return (
		<Dialog open={open} onClose={() => setOpenDialog(false)}>
			<Card sx={styles.dialogContent(isMobile)}>
				<CardHeader
					sx={styles.headerDialog}
					avatar={icon}
					title={
						<Stack spacing={-0.5}>
							<Typography sx={styles.titleDialogText} variant='title1'>
								{title}
							</Typography>
							<Typography variant='caption'>{subtitle}</Typography>
						</Stack>
					}
				/>
				<CardContent>
					<Stack sx={styles.message} spacing={1}>
						<Typography variant='body2'>{message1}</Typography>
						<Typography variant='body2'>{message2}</Typography>
					</Stack>
					<Stack
						direction={isMobile ? 'column' : 'row'}
						spacing={2}
						justifyContent={'space-between'}
					>
						<Button sx={styles.secondButton} onClick={() => setOpenDialog(false)}>
							{secondButton}
						</Button>
						<Button
							sx={styles.primaryButton}
							onClick={onPrimaryAction}
							disabled={isDisablePrimaryAction || loadingAction}
						>
							{primaryButton}
						</Button>
					</Stack>
				</CardContent>
			</Card>
		</Dialog>
	)
}
DialogCommonTemplate.propTypes = {
	icon: propTypes.any,
	title: propTypes.string,
	subtitle: propTypes.string,
	message1: propTypes.string,
	message2: propTypes.string,
	primaryButton: propTypes.any,
	secondButton: propTypes.any,
	open: propTypes.bool,
	setOpenDialog: propTypes.func,
	onSendClose: propTypes.func,
	loadingAction: propTypes.bool,
	onPrimaryAction: propTypes.func,
	isDisablePrimaryAction: propTypes.bool,
}
DialogCommonTemplate.defaulProps = {
	open: false,
	loadingAction: false,
	setOpenDialog: () => console.warn('No [setOpenDialog] call back defined'),
	onSendClose: () => console.warn('No [onSendClose] call back defined'),
	icon: null,
	title: '',
	subtitle: '',
	message1: '',
	message2: '',
	primaryButton: null,
	secondButton: null,
	onPrimaryAction: () => console.warn('No [onPrimaryAction] CallBack defined'),
	isDisablePrimaryAction: false,
}
export default DialogCommonTemplate
