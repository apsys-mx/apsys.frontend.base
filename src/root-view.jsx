import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { OidcProvider, loadUser } from 'redux-oidc'
import userManager from './auth/user-manager'

loadUser(store, userManager)

/**
 * Root view component
 * @param {*} props
 * @returns
 */
const RootView = (props) => {
	return (
		<OidcProvider store={store} userManager={userManager}>
			<Provider store={store}>{props.children}</Provider>
		</OidcProvider>
	)
}
export default RootView
