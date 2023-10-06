import Theme from '../../assets/themes/default.theme'
export const carIcon = {
	color: Theme.palette.primary.main,
}
export const circularProgress = {
	m: 2,
}
export const dialogContent = (isMobile) => {
	if (isMobile) {
		return {
			width: '318px',
		}
	}
	return {
		width: '600px',
	}
}
export const headerDialog = {
	color: Theme.palette.primary.dark,
}
export const titleDialogText = {}
export const message = {
	marginBottom: '20px',
	color: Theme.palette.primary.dark,
}
export const primaryButton = {
	width: '100%',
	boxShadow: 'none',
	textTransform: 'initial',
	borderRadius: '8px',
	fontSize: '12px',
	color: Theme.palette.background.paper,
	backgroundColor: Theme.palette.primary.main,
	'&:hover': {
		color: Theme.palette.primary.main,
		border: '2px solid',
		borderColor: Theme.palette.primary.main,
	},
	height: '35px',
	padding: '18px',
	'&.Mui-disabled': {
		backgroundColor: Theme.palette.grey[75],
	},
}
export const secondButton = {
	width: '100%',
	boxShadow: 'none',
	textTransform: 'initial',
	borderRadius: '8px',
	fontSize: '12px',
	color: Theme.palette.background.paper,
	backgroundColor: Theme.palette.primary.light,
	'&:hover': {
		color: Theme.palette.primary.light,
		border: '2px solid',
		borderColor: Theme.palette.primary.light,
	},
	height: '35px',
	padding: '18px',
	'&.Mui-disabled': {
		backgroundColor: Theme.palette.grey[75],
	},
}
