import theme from '../../../assets/themes/default.theme'

export const root = {
	display: 'flex',
	flexDirection: 'column',
	padding: '16px',
	justifyContent: 'flex-end',
}
export const dialogTitle = {
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	flex: '1 0 0',
}
export const dialogIcon = {
	color: theme.palette.secondary.main,
}
export const closeIcon = {
	md: '23px',
}

export const titles = {
	display: 'flex',
	flexDirection: 'column',
	width: '491px',
	justifyContent: 'center',
	alignItems: 'flex-start',
}
export const dialogTitleText = {
	color: 'var(--Text-Dark, #2C2C2C)',
	marginLeft: '10px',
}
export const dialogSubTitleText = {
	color: 'var(--Text-Dark, #2C202C)',
	marginLeft: '10px',
}
export const content = {
	color: 'var(--Text-Main, #515150)',
}

export const acceptButton = {
	textTransform: 'initial',
	backgroundColor: 'var(--Red-PTM, #C0003B)',
	borderRadius: '8px',
	color: 'var(--m-3-sys-light-on-primary, #FFF)',
}
export const denyButton = {
	textTransform: 'none',
	borderRadius: '20px',
	marginRight: '15px',
}
export const cancelButton = {
	textTransform: 'initial',
}
