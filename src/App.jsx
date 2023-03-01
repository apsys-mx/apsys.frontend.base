import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './auth/protected-route'
import Home from './features/home/index/home'
import Layout from './features/home/layout/layout'

/**
 * App component
 */
const App = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}
			>
				<Route path='/' element={<Home />} />
			</Route>
		</Routes>
	)
}

export default App
