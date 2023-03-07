import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import i18next from 'i18next'

import userMananger from '../../../auth/user-manager'
import { getProfile } from '../../../auth/oidc.selectors'

/** Import templates */
import DesktopTemplate from './layout.template'

/** Import toaster */
import Toaster from '../toaster/toaster'
import { setToasterState } from '../home.slice'
import { getToasterOptions } from '../toaster/toaster-selectors'

/**
 * Layout
 */
const Layout = () => {
	const dispatch = useDispatch()
	const profile = useSelector((state) => getProfile(state))
	const toasterOptions = useSelector((state) => getToasterOptions(state))
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

	return (
		<Fragment>
			<DesktopTemplate profile={profile} onLogoutClick={onLogoutClick} />
			<Toaster
				{...toasterOptions}
				onClose={() => dispatch(setToasterState({ ...toasterOptions, open: false }))}
			/>
		</Fragment>
	)
}
export default Layout
