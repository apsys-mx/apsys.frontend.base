import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from '../../features/application/application.selectors'
import { setTitle } from '../../features/application/application.slice'

import DesktopTemplate from './home.template'

/**
 * Home component
 */
const Home = () => {
	var dispatch = useDispatch()
	const title = useSelector((state) => getTitle(state))

	const onchangeTitle = (event) => dispatch(setTitle(event.target.value))

	return <DesktopTemplate title={title} onchangeTitle={onchangeTitle} />
}

export default Home
