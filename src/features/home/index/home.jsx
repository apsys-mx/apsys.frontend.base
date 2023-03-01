import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from '../home.selectors'
import { setTitle } from '../home.slice'

import DesktopTemplate from './home.template'

import userMananger from '../../../auth/user-manager'

/**
 * Home component
 */
const Home = () => {
	var dispatch = useDispatch()
	const title = useSelector((state) => getTitle(state))

	const onchangeTitle = (event) => dispatch(setTitle(event.target.value))
	const onLogoutClick = () => userMananger.signoutRedirect()

	return (
		<DesktopTemplate
			title={title}
			onchangeTitle={onchangeTitle}
			onLogoutClick={onLogoutClick}
		/>
	)
}

export default Home
