import theme from '../../../assets/themes/default.theme'

export const root = {
	display: 'flex',
	alignSelf: 'center',
}

export const inputHolder = {
	width: '215px',
	backgroundColor: 'dodgerblue',
	borderRadius: '6px',
	display: 'flex',
	height: '40px',
}

export const input = {
	padding: theme.spacing(1),
	marginLeft: theme.spacing(1),
	flex: 1,
	color: theme.palette.grey[50],
}

export const iconButton = {
	color: theme.palette.grey[50],
	opacity: '.75',
	'& :hover': {
		opacity: '.5',
	},
}

export const divider = {
	height: 28,
	margin: 4,
}
