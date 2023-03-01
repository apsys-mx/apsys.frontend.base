import React from 'react'
import DesktopTemplate from './landing.template'
import userManager from '../../auth/user-manager'

/**
 * Landing page
 */
const Landing = () => {
	const onLoginClick = () => userManager.signinRedirect()
	return <DesktopTemplate onLoginClick={onLoginClick} />
}
export default Landing
