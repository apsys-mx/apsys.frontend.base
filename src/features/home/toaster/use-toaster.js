import { useDispatch } from 'react-redux'
import { setToasterState } from '../home.slice'

/**
 * Use toaster hook
 */
const useToaster = () => {
	const dispatch = useDispatch()

	const success = (message) => {
		dispatch(setToasterState({ open: true, message: message, severity: 'success' }))
	}

	const error = (message) => {
		dispatch(setToasterState({ open: true, message: message, severity: 'error' }))
	}

	return {
		sucesss: success,
		error: error,
	}
}
export default useToaster
