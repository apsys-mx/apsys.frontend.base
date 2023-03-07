import theme from '../../../assets/themes/default.theme'

const toolbarHeight = theme.spacing(8)

export const root = {
	display: 'grid',
	height: '100vh',
	width: '100%',
	gridTemplateRows: `${toolbarHeight} auto`,
}

export const appToolbar = {
	gridRowStart: 1,
	gridRowEnd: 2,
	space: {
		display: 'flex',
		width: '100%',
		padding: '6px 8px',
	},
}

export const main = {
	gridRowStart: 2,
	gridRowEnd: 3,
}
