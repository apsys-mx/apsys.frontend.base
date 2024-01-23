import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import propTypes from 'prop-types'

/**
 * Toaster
 */
const Toaster = (props) => {
	const { onClose, severity, message } = props

	const action = (
		<IconButton size='small' aria-label='close' color='inherit' onClick={onClose}>
			<CloseIcon fontSize='small' />
		</IconButton>
	)

	return (
		<Snackbar {...props} action={action} autoHideDuration={5000}>
			<Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	)
}
Toaster.propTypes = {
	severity: propTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
	open: propTypes.bool.isRequired,
	onClose: propTypes.func,
	anchorOrigin: propTypes.shape({
		vertical: propTypes.string.isRequired,
		horizontal: propTypes.string.isRequired,
	}),
}
Toaster.defaultProps = {
	severity: 'info',
	open: false,
	anchorOrigin: {
		vertical: 'top',
		horizontal: 'center',
	},
}
const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

/**
 *
 */
export const defaultToasterOptions = {
	open: false,
	message: '',
	severity: 'info',
}

export default Toaster
