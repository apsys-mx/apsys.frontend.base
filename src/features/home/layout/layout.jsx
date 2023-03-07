import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import i18next from 'i18next'

import userMananger from '../../../auth/user-manager'
import { getProfile } from '../../../auth/oidc.selectors'

/** Import templates */
import DesktopTemplate from './layout.template'

/**
 * Layout
 */
const Layout = () => {
	const profile = useSelector((state) => getProfile(state))
	const [namespaceLoaded, setNamespaceLoaded] = useState(false)

	useEffect(() => {
		i18next
			.loadNamespaces('home', (err) => {
				if (err) console.error('Error loading `home` namespace', err)
			})
			.then(() => setNamespaceLoaded(true))
	}, [])

	const onLogoutClick = () => userMananger.signoutRedirect()

	if (!namespaceLoaded) return <span>Loading dictionary</span>

	return <DesktopTemplate profile={profile} onLogoutClick={onLogoutClick} />
}
export default Layout
