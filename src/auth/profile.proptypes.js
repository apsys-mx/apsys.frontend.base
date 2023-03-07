import propTypes from 'prop-types'

export const profilePropTypes = {
	avatar_url: propTypes.string.isRequired,
	email: propTypes.string.isRequired,
	name: propTypes.string.isRequired,
	user_name: propTypes.string.isRequired,
	two_factor_enabled: propTypes.string.isRequired,
	user_type: propTypes.string.isRequired,
	onLogoutClick: propTypes.func.isRequired,
}

export const defaultProfilePropTypes = {
	avatar_url: '',
	email: '',
	name: '',
	user_name: '',
	two_factor_enabled: '',
	user_type: '',
	onLogoutClick: () => console.warn('No [onLogoutClick] callback defined'),
}
