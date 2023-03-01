import React from 'react'
import Home from './features/home/index/home'
import { Routes, Route } from 'react-router-dom'

/**
 * App component
 */
const App = () => {
	return (
		<Routes>
			<Route index path='/' element={<Home />} />
		</Routes>
	)
}

export default App
