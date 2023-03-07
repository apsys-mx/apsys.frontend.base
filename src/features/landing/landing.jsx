import React, { Fragment, useEffect, useState } from 'react'
import i18next from 'i18next'
import DesktopTemplate from './landing.template'
import userManager from '../../auth/user-manager'
import { languages } from '../../assets/languages/i18n'

/**
 * Landing page
 */
const Landing = () => {
	const [namespaceLoaded, setNamespaceLoaded] = useState(false)

	useEffect(() => {
		i18next
			.loadNamespaces('landing', (err) => {
				if (err) console.error('Error loading `landing` namespace', err)
			})
			.then(() => setNamespaceLoaded(true))
	}, [])

	const onLoginClick = () => userManager.signinRedirect()
	const onChangeLanguage = (lang) => {
		i18next.changeLanguage(lang.code)
	}

	if (!namespaceLoaded) return <span>Loading dictionary</span>

	return (
		<Fragment>
			<DesktopTemplate
				languages={languages}
				onLoginClick={onLoginClick}
				onChangeLanguage={onChangeLanguage}
			/>
		</Fragment>
	)
}
export default Landing
