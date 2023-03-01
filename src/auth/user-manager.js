/** Oidc section imports */
import { createUserManager } from 'redux-oidc'
import { getAbsoluteUrlAddress } from '../helpers/url-helper'

/** Defines the user manager configuration */
const userManagerConfig = {
	authority: `${import.meta.env.VITE_IDENTITY_SERVER_URL}`,
	client_id: `${import.meta.env.VITE_APP_CLIENT_ID}`,
	redirect_uri: getAbsoluteUrlAddress('callback'),
	post_logout_redirect_uri: getAbsoluteUrlAddress(''),
	response_type: 'id_token token',
	scope: 'openid profile userprofile',
	filterProtocolClaims: true,
	loadUserInfo: true,
}

const userManager = createUserManager(userManagerConfig)
export default userManager
