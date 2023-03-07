import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import RootView from './root-view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './features/landing/landing'
import CallbackPage from './auth/callback-page'

import './assets/roboto-font'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Suspense fallback='loading'>
			<RootView>
				<BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
					<Routes>
						<Route path='/*' element={<App />} />
						<Route path='callback' element={<CallbackPage />} />
						<Route path='landing' element={<Landing />} />
					</Routes>
				</BrowserRouter>
			</RootView>
		</Suspense>
	</React.StrictMode>
)
