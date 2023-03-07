import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTitle } from '../home.selectors'
import { setTitle } from '../home.slice'

/** Import templates */
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
