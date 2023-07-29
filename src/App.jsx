import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './auth/protected-route'
import Home from './features/home/index/home'
import Layout from './features/home/layout/layout'

import * as selectors from './auth/oidc.selectors'

/**
 * App component
 */
const App = () => {
	const isLoadingOidc = useSelector((state) => selectors.isLoadingUser(state))

	if (isLoadingOidc) {
		return <span>Loading user's profile</span>
	}

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
