import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as selectors from './oidc.selectors'

/**
 * Define protected route
 */
const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => selectors.isAuthenticated(state))
	const profile = useSelector((state) => selectors.getProfile(state))

	if (!isAuthenticated) return <Navigate to='/landing' replace state={{}} />

	if (profile.two_factor_enabled !== 'true') {
		console.warn(`The [two_factor_enabled] has invalid value: [${profile.two_factor_enabled}]`)
		return <Navigate to='/forbidden' replace state={{}} />
	}

	return children
}
export default ProtectedRoute
