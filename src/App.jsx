import React from 'react'
import { useSelector } from 'react-redux'
import { getTitle } from './features/application/application.selectors'

/**
 * App component
 */
const App = () => {
	const title = useSelector((state) => getTitle(state))
	return (
		<div>
			<h1>{title}</h1>
		</div>
	)
}

export default App
