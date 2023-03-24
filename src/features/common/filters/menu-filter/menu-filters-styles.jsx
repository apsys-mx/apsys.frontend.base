import defaultTheme from '../../../../resources/theme/default'
import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme) => ({
	separation: {
		display: 'flex',
	},
	titlePopover: {
		marginRight: '10px !important',
		marginLeft: '10px !important',
	},
	search: {
		backgroundColor: ` brag`,
		margin: '7px !important',
	},
	checkFilter: {
		color: `background.dark !important`,
	},
	filterItem: {
		minHeight: '6rem  !important',
		maxHeight: '12rem  !important',
		overflowY: 'auto  !important',
	},
	containerButton: {
		display: 'flex !important',
		justifyContent: 'flex-end !important',
	},
	stylesButton: {
		color: `primary.main !important`,
		margin: '7px !important',
		textTransform: 'none',
		boxShadow: 'none',
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	filterContainer: {
		padding: '10px',
	},
	filterPaper: {
		padding: '16px',
	},
	checkList: {
		height: '28px',
		backgroundColor: defaultTheme.palette.background.main,
		borderRadius: '8px',
		marginBottom: '8px',
	},
	filterPadding: {
		paddingTop: '10px',
		paddingBottom: '10px',
	},
}))
