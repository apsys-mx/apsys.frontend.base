import { createSelector } from 'reselect'

const getOidcState = (state) => (state = state.oidc)

/**
 * Determine if the oidc is loading user
 */
const isLoadingUser = createSelector(getOidcState, (oidcState) => {
	return oidcState.isLoadingUser
})

/**
 * Get the selector to determine if the user is already authenticated
 */
const isAuthenticated = createSelector(getOidcState, (oidcState) => {
	const isLoadingUser = oidcState.isLoadingUser
	const user = oidcState.user

	if (!(isLoadingUser === false && user)) {
		return false
	}
	return true
})

/**
 * Get the logged user profile
 */
const getProfile = createSelector(getOidcState, (oidcState) => {
	const isLoadingUser = oidcState.isLoadingUser
	const user = oidcState.user

	if (!(isLoadingUser === false && user)) {
		return undefined
	}
	return user.profile
})

export { isAuthenticated, isLoadingUser, getProfile }
