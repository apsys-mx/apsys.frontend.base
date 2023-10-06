import theme from '../../../assets/themes/default.theme'

export const baseStyle = {
	width: '93%',
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '10px',
	borderWidth: 1,
	borderRadius: '8px',
	borderColor: theme.palette.text.secondary,
	borderStyle: 'dashed',
	color: theme.palette.text.secondary,
	outline: 'none',
	transition: 'border .24s ease-in-out',
	backgroundColor: theme.palette.background.main,
	cursor: 'pointer',
}

export const rejectStyle = {
	borderColor: theme.palette.error.light,
}

export const filesContainer = {
	marginTop: '5px',
}
export const errorIcon = {
	color: theme.palette.error.light,
}
export const errorUploadFile = {
	marginRight: '15px',
	backgroundColor: theme.palette.error.light,
	color: 'white',
	borderRadius: '8px',
	padding: '1px 15px',
}
export const justifyChip = {
	justifyContent: 'space-between',
	width: '100%',
}

export const fileItem = {
	backgroundColor: theme.palette.secondary.light,
	color: theme.palette.background.paper,
	borderRadius: '8px',
	height: '26px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	p: 1,
	flexDirection: 'row',
	marginTop: 2,
	marginBottom: 1,
	width: '360px',
}

export const closeButton = {
	color: theme.palette.background.paper,
	transform: 'scale(.7)',
}
export const icon ={
	fontSize :'60px',
	marginBottom: '9px',
	color: theme.palette.text.main,
}

export const helperText ={
	color: theme.palette.primary.main,
}
