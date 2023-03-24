import theme from '../../../resources/theme/default'

export const mainContainer = {
	marginTop: (theme) => theme.toolbarHeight,
	width: '300px',
	padding: '0px 8px 0px 8px',
	borderRadius: '8px',
	overflow: 'auto',
	maxHeight: '28vh',
}
export const butttonSettings = {
	color: theme.palette.primary.main,
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
}
export const popoverContainer = {
	height: '60vh',
}
export const configItem = {
	border: 1,
	borderColor: 'transparent',
	marginBottom: '8px',
	borderRadius: 2,
	backgroundColor: theme.palette.text.secondary,
}
export const saveAndResetContainer = {
	padding: '10px',
	backgroundColor: 'common.white',
	zIndex: '1',
	bottom: '0',
	position: 'sticky',
}
/**
 * title
 */
export const titleConfig = {
	color: theme.palette.primary.main,
	padding: '15px 10px 10px 10px',
}
export const titleContent = {
	display: 'flex',
	justifyContent: 'center',
}
