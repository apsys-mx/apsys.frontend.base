import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTitle } from '../home.selectors'
import { setTitle } from '../home.slice'

import useToaster from '../toaster/use-toaster'

/** Import templates */
import DesktopTemplate from './home.template'

/**
 * Home component
 */
const Home = () => {
	const { sucesss } = useToaster()
	var dispatch = useDispatch()
	const title = useSelector((state) => getTitle(state))

	const onchangeTitle = (event) => dispatch(setTitle(event.target.value))
	const onShowToaster = () => sucesss('Toaster message')

	return (
		<DesktopTemplate
			title={title}
			onchangeTitle={onchangeTitle}
			onShowToaster={onShowToaster}
		/>
	)
}

export default Home
