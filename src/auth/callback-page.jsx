import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import userManager from './user-manager'
import { useNavigate } from 'react-router'

/**
 * Callback page to complete the authentication process
 * @returns
 */
const CallbackPage = () => {
	const navigate = useNavigate()

	const successCallback = () => navigate('/')

	const errorCallback = (error) => {
		console.log('login_required')
	}

	return (
		<CallbackComponent
			userManager={userManager}
			successCallback={successCallback}
			errorCallback={errorCallback}
		>
			<span>Loading user's profile... wait</span>
		</CallbackComponent>
	)
}

export default CallbackPage
