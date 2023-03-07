import React, { useEffect, useState } from 'react'
import i18next from 'i18next'
import DesktopTemplate from './layout.template'

/**
 * Layout
 */
const Layout = () => {
	const [namespaceLoaded, setNamespaceLoaded] = useState(false)

	useEffect(() => {
		i18next
			.loadNamespaces('home', (err) => {
				if (err) console.error('Error loading `home` namespace', err)
			})
			.then(() => setNamespaceLoaded(true))
	}, [])

	if (!namespaceLoaded) return <span>Loading dictionary</span>

	return <DesktopTemplate />
}
export default Layout
