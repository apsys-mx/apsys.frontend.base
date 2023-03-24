import { makeStyles } from '@mui/styles'

export const useDefaultStyles = makeStyles(() => ({
	cssLabel: {},
	cssFocused: {
		color: 'black !important',
	},
	cssOutlinedInput: {
		color: 'black !important',
	},
	notchedOutline: {
		borderColor: 'red !important',
		borderRadius: 8,
	},
	notchedOutlineSuccess: {
		borderWidth: '1px',
		color: 'red !important',
		borderRadius: 8,
	},
	input: {
		'&.Mui-disabled': {
			color: 'black',
			opacity: 1,
		},
	},
	helperText: { marginLeft: '-10px!important' },
}))
