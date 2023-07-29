import { createSelector } from 'reselect'

const getOidcState = (state) => state.oidc

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
	return !!(isLoadingUser === false && user)
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
	const avatarUrl = `${import.meta.env.VITE_IDENTITY_SERVER_URL}${user.profile.avatar_url}`
	return { ...user.profile, avatar_url: avatarUrl }
})

export { isAuthenticated, isLoadingUser, getProfile }
