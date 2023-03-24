import { createTheme } from '@mui/material/styles'

/**
 * Default theme
 */
const defaultTheme = {
	palette: {
		primary: {
			light: '#6FF6F9',
			main: '#00ADB2',
			dark: '#00696C',
		},
		secondary: {
			light: '#EEDBFF',
			main: '#A77DDE',
			dark: '#411575',
		},
		text: {
			light: '#FCFCFC',
			main: '#A1A19F',
			dark: '#585656',
		},
		background: {
			light: '#FCFCFC',
			main: '#ECF3F9',
			dark: '#F1F1F1',
		},
	},
	typography: {
		fontFamily: 'Roboto',
	},
}

export default createTheme(defaultTheme)
