import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { ThemeProvider } from '@mui/material/styles'
import defaultTheme from './assets/themes/default.theme'

import { OidcProvider, loadUser } from 'redux-oidc'
import userManager from './auth/user-manager'
import './assets/languages/i18n'

loadUser(store, userManager)

/**
 * Root view component
 * @param {*} props
 * @returns
 */
const RootView = (props) => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<OidcProvider store={store} userManager={userManager}>
				<Provider store={store}>{props.children}</Provider>
			</OidcProvider>
		</ThemeProvider>
	)
}
export default RootView
