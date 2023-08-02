import React, { Fragment, useEffect, useState } from 'react'
import i18next from 'i18next'
import userManager from '../../auth/user-manager'
import { languages } from '../../assets/languages/i18n'

import { useIsIsMobile } from '../../hooks/use-is-mobile'

import DesktopTemplate from './landing.template'
import MobileTemplate from './landing.template.mobile'

/**
 * Landing page
 */
const Landing = () => {
	const isMobile = useIsIsMobile()
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

	const props = {
		languages: languages,
		onLoginClick: onLoginClick,
		onChangeLanguage: onChangeLanguage,
	}

	return (
		<Fragment>
			{isMobile ? <MobileTemplate {...props} /> : <DesktopTemplate {...props} />}
		</Fragment>
	)
}
export default Landing
