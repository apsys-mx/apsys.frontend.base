import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from './features/application/application.selectors'
import { setTitle } from './features/application/application.slice'

/**
 * App component
 */
const App = () => {
	var dispatch = useDispatch()
	const title = useSelector((state) => getTitle(state))

	const onchangeTitle = (event) => dispatch(setTitle(event.target.value))

	return (
		<div>
			<h1>{title}</h1>
			<input onChange={onchangeTitle} />
		</div>
	)
}

export default App
