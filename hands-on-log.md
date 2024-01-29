## Install vitejs

-   Create a folder with name `apsys.frontend.base`
-   Run the command `npm create vite@latest .`
-   Run the command `npm install`
-   Run the command `npm run dev`

Check that the project is running correctly

## Install and configure redux store with redux-toolkit

### Set initial files structure

-   Delete files `App.css` and `index.css`
-   Rename files `App.jsx` to `app.jsx`
-   Change the `main.jsx` content as show below

```jsx
// src\main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
```

-   Change the `app.jsx` content as show below

```jsx
// src\app.jsx
import React from 'react'

const App = () => {
	return (
		<div>
			<h1>Hello World</h1>
		</div>
	)
}

export default App
```

### Configure the redux store

-   Install redux `npm install react-redux` and redux-toolkit `npm install @reduxjs/toolkit`
-   Create a file `store.js` with the code show below

```javascript
// src\store\store.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: import.meta.env.DEV,
})
```

-   Create a file `root-view.jsx` with the code show below

```jsx
// src\root-view.jsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

const RootView = (props) => {
	return <Provider store={store}>{props.children}</Provider>
}
export default RootView
```

-   Modify the `main.jsx` as show below in order to inject the store in the root of the application

```jsx
// src\main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import RootView from './root-view'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RootView>
			<App />
		</RootView>
	</React.StrictMode>
)
```

### Add an application slice

-   Create a file `home.slice.js` with the code show below

```javascript
// src\features\home\home.slice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Hello world',
}
export const homeSlice = createSlice({
	name: 'homeSlice',
	initialState,
	reducers: {},
})
export default homeSlice.reducer
```

-   Modify the file `store.js` as show below in order to add the application slice in the store

```javascript
// src\store\store.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import homeSlice from '../features/home/home.slice'

const rootReducer = combineReducers({
	homeSlice: homeSlice,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: import.meta.env.DEV,
})
```

### Add selectors and actions

-   Create a file `home.selectors.js` with the code show below

```javascript
// src\features\home\home.selectors.js
import { createSelector } from 'reselect'

const getState = (state) => (state = state.homeSlice)

const getTitle = createSelector(getState, (state) => {
	return state.title
})

export { getTitle }
```

-   Modify the file `home.slice.js` as show below

```javascript
// src\features\home\home.slice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Hello world',
}

export const homeSlice = createSlice({
	name: 'homeSlice',
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload
		},
	},
})

export const { setTitle } = homeSlice.actions
export default homeSlice.reducer
```

-   Modify the file `app.jsx` as show below in order to use the selector and actions defined

```jsx
// src\app.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from './features/home/home.selectors'
import { setTitle } from './features/home/home.slice'

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
```

## Create environment files

-   Create three environment files: `.env` for development environment, `.env.qas` for qas environment, and `.env.prd` for production environment in the root folder
-   Add the next line in the three files

```text
VITE_APP_ROOT='/'
```

## Configure routing

-   Install routing library `npm install react-router-dom`
-   Create the files `landing.jsx` and `landing.template.jsx` for a landing page used for not authenticated users

```jsx
// src\features\landing\landing.jsx
import React from 'react'
import DesktopTemplate from './landing.template'

const Landing = () => {
	return <DesktopTemplate />
}
export default Landing
```

```jsx
// src\features\landing\landing.template.jsx
import React from 'react'

const LandingTemplate = () => {
	return <h1>Landing page template</h1>
}
export default LandingTemplate
```

-   Create the files `home.jsx` and `home.template.jsx` for a home page used for authenticated users

```jsx
// src\features\home\index\home.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from '../home.selectors'
import { setTitle } from '../home.slice'

import DesktopTemplate from './home.template'

const Home = () => {
	var dispatch = useDispatch()
	const title = useSelector((state) => getTitle(state))

	const onchangeTitle = (event) => dispatch(setTitle(event.target.value))

	return <DesktopTemplate title={title} onchangeTitle={onchangeTitle} />
}
export default Home
```

```jsx
// src\features\home\index\home.template.jsx
import React from 'react'

const HomeTemplate = ({ title, onchangeTitle }) => {
	return (
		<div>
			<h1>Home page</h1>
			<h2>{title}</h2>
			<input onChange={onchangeTitle} />
		</div>
	)
}
export default HomeTemplate
```

-   Modify `main.jsx` in order to define the routes for a landing page

```jsx
// src\main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import RootView from './root-view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './features/landing/landing'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RootView>
			<BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
				<Routes>
					<Route path='/*' element={<App />} />
					<Route path='login' element={<Landing />} />
				</Routes>
			</BrowserRouter>
		</RootView>
	</React.StrictMode>
)
```

-   Modify `app.jsx` in order to define the routes for a home page

```jsx
// src\app.jsx
import React from 'react'
import Home from './features/home/index/home'
import { Routes, Route } from 'react-router-dom'

const App = () => {
	return (
		<Routes>
			<Route index path='/' element={<Home />} />
		</Routes>
	)
}

export default App
```

## Configure IdentityServer4

-   Install oidc libraries running `npm install oidc-client` and `npm install redux-oidc`
-   Modify the environment files as show below

```javascript
// .env file
VITE_APP_ROOT = '/'
VITE_APP_CLIENT_ID = 'apsys.frontend.base'
VITE_IDENTITY_SERVER_URL = 'http://localhost:57065/'
```

```javascript
// .env.qas file
VITE_APP_ROOT = '/'
VITE_APP_CLIENT_ID = 'apsys.frontend.base'
VITE_IDENTITY_SERVER_URL = 'http://10.7.93.233:8020/uat4.0/'
```

```javascript
// .env.prd file
VITE_APP_ROOT = '/'
VITE_APP_CLIENT_ID = 'apsys.frontend.base'
VITE_IDENTITY_SERVER_URL = 'https://identity.efemsa.com/v4.0/'
```

### Create the user-manager file and add to the redux store

-   Create the file `user-manager.js`

```javascript
// src\auth\user-manager.js
import { createUserManager } from 'redux-oidc'
import { getAbsoluteUrlAddress } from '../helpers/url-helper'

const userManagerConfig = {
	authority: `${import.meta.env.VITE_IDENTITY_SERVER_URL}`,
	client_id: `${import.meta.env.VITE_APP_CLIENT_ID}`,
	redirect_uri: getAbsoluteUrlAddress('callback'),
	post_logout_redirect_uri: getAbsoluteUrlAddress(''),
	response_type: 'id_token token',
	scope: 'openid profile userprofile',
	filterProtocolClaims: true,
	loadUserInfo: true,
	monitorSession: false,
}

const userManager = createUserManager(userManagerConfig)
export default userManager
```

-   Modify the `store.js` file

```javascript
// src\store\store.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import homeSlice from '../features/home/home.slice'

import { reducer as oidcReducer } from 'redux-oidc'
import createOidcMiddleware from 'redux-oidc'
import userManager from '../auth/user-manager'

const oidcMiddleware = createOidcMiddleware(userManager)

const rootReducer = combineReducers({
	homeSlice: homeSlice,
	oidc: oidcReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(oidcMiddleware),
	devTools: import.meta.env.DEV,
})
```

-   Modify the `root-view.jsx` file

```javascript
// src\root-view.jsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { OidcProvider, loadUser } from 'redux-oidc'
import userManager from './auth/user-manager'

loadUser(store, userManager)

const RootView = (props) => {
	return (
		<OidcProvider store={store} userManager={userManager}>
			<Provider store={store}>{props.children}</Provider>
		</OidcProvider>
	)
}
export default RootView
```

### Implements login process

-   Create the file `callback-page.jsx`

```jsx
// src\auth\callback-page.jsx
import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import userManager from './user-manager'
import { useNavigate } from 'react-router'

const CallbackPage = () => {
	const navigate = useNavigate()

	const successCallback = () => navigate('/')

	const errorCallback = (error) => {
		console.log('login_required')
	}

	return (
		<CallbackComponent
			userManager={userManager}
			successCallback={successCallback}
			errorCallback={errorCallback}
		>
			<span>Loading user's profile... wait</span>
		</CallbackComponent>
	)
}

export default CallbackPage
```

-   Add the callback route in the `main.jsx` file

```jsx
// src\main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import RootView from './root-view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './features/landing/landing'
import CallbackPage from './auth/callback-page'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RootView>
			<BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
				<Routes>
					<Route path='/*' element={<App />} />
					<Route path='callback' element={<CallbackPage />} />
					<Route path='landing' element={<Landing />} />
				</Routes>
			</BrowserRouter>
		</RootView>
	</React.StrictMode>
)
```

-   Add the login buton and callback in the landing page

```jsx
// src\features\landing\landing.template.jsx
import React from 'react'

const LandingTemplate = ({ onLoginClick }) => {
	return (
		<div>
			<h1>Landing page template</h1>
			<button onClick={onLoginClick}>Login</button>
		</div>
	)
}
export default LandingTemplate
```

```jsx
// src\features\landing\landing.jsx
import React from 'react'
import DesktopTemplate from './landing.template'
import userManager from '../../auth/user-manager'

const Landing = () => {
	const onLoginClick = () => userManager.signinRedirect()
	return <DesktopTemplate onLoginClick={onLoginClick} />
}
export default Landing
```

Test the login process

> The `apsys.frontend.base` identity server's client must be initialized before testing the login process.

### Implements the logout process

-   Add the logout button and callback in the home page

```jsx
// src\features\home\index\home.template.jsx
import React from 'react'

const HomeTemplate = ({ title, onchangeTitle, onLogoutClick }) => {
	return (
		<div>
			<h1>Home page</h1>
			<h2>{title}</h2>
			<input onChange={onchangeTitle} />
			<button onClick={onLogoutClick}>Logout</button>
		</div>
	)
}

export default HomeTemplate
```

```jsx
// src\features\home\index\home.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from '../home.selectors'
import { setTitle } from '../home.slice'

import DesktopTemplate from './home.template'

import userMananger from '../../../auth/user-manager'

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
```

### Create a protected routes

-   Create a file `protected-route.jsx`

```jsx
// src\auth\protected-route.jsx
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as selectors from './oidc.selectors'

const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => selectors.isAuthenticated(state))
	const profile = useSelector((state) => selectors.getProfile(state))

	if (!isAuthenticated) return <Navigate to='/landing' replace state={{}} />

	if (profile.two_factor_enabled !== 'true') {
		console.warn(`The [two_factor_enabled] has invalid value: [${profile.two_factor_enabled}]`)
		return <Navigate to='/forbidden' replace state={{}} />
	}

	return children
}
export default ProtectedRoute
```

-   Create an application layout file

```jsx
// src\features\home\layout\layout.jsx
import React from 'react'
import DesktopTemplate from './layout.template'

const Layout = () => {
	return <DesktopTemplate />
}
export default Layout
```

```jsx
// src\features\home\layout\layout.template.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutTemplate = () => {
	return (
		<div>
			<Outlet />
		</div>
	)
}
export default LayoutTemplate
```

-   Modify the `app.jsx` file in order to protect all the routes

```jsx
// src\app.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './auth/protected-route'
import Home from './features/home/index/home'
import Layout from './features/home/layout/layout'

import * as selectors from './auth/oidc.selectors'

const App = () => {
	var isLoadingOidc = useSelector((state) => selectors.isLoadingUser(state))

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
```

## Internationalization

-   Install `npm install react-i18next i18next`
-   Install `npm install i18next-browser-languagedetector`
-   Install `npm install i18next-http-backend`
-   Create the `i18n.js` file

```javascript
// src\assets\languages\i18n.js
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(Backend)
	.init({
		ns: [],
		lang: 'en',
		fallbackLng: 'es',
		debug: import.meta.env.DEV,
	})

export const languages = [
	{
		code: 'en',
		name: 'English',
	},
	{
		code: 'es',
		name: 'Español',
	},
]
```

-   Create the next translation's files in the `public` folder

```json
// public\locales\en\landing.json
{
	"title": "Welcome",
	"login": "Login"
}
```

```json
// public\locales\en\home.json
{
	"title": "Home page",
	"logout": "Close sesión"
}
```

```json
// public\locales\es\landing.json
{
	"title": "Bienvenido",
	"login": "Ingresar"
}
```

```json
// public\locales\es\home.json
{
	"title": "Pagina inicio 2",
	"logout": "Cerrar sesión"
}
```

-   Modify the `root-view.jsx` file

```jsx
// src\root-view.jsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { ThemeProvider } from '@mui/material/styles'
import defaultTheme from './assets/themes/default.theme'

import { OidcProvider, loadUser } from 'redux-oidc'
import userManager from './auth/user-manager'
import './assets/languages/i18n'

loadUser(store, userManager)

const RootView = (props) => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<OidcProvider store={store} userManager={userManager}>
				<Provider store={store}>{props.children}</Provider>
			</OidcProvider>
		</ThemeProvider>
	)
}
export default RootView
```

-   Modify the `main.jsx` file

```jsx
// src\main.jsx
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
```

-   Change the `landing.jsx` file

```jsx
// src\features\landing\landing.jsx
import React, { Fragment, useEffect, useState } from 'react'
import i18next from 'i18next'
import DesktopTemplate from './landing.template'
import userManager from '../../auth/user-manager'
import { languages } from '../../assets/languages/i18n'

const Landing = () => {
	const [namespaceLoaded, setNamespaceLoaded] = useState(false)

	useEffect(() => {
		i18next
			.loadNamespaces('landing', (err) => {
				if (err) console.error('Error loading `landing` namespace', err)
			})
			.then(() => setNamespaceLoaded(true))
	}, [])

	const onLoginClick = () => userManager.signinRedirect()
	const onChangeLanguage = (lang) => {
		i18next.changeLanguage(lang.code)
	}

	if (!namespaceLoaded) return <span>Loading dictionary</span>

	return (
		<Fragment>
			<DesktopTemplate
				languages={languages}
				onLoginClick={onLoginClick}
				onChangeLanguage={onChangeLanguage}
			/>
		</Fragment>
	)
}
export default Landing
```

-   Change the `landing.template.jsx` file

```jsx
// src\features\landing\landing.template.jsx
import React from 'react'
import { Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LandingTemplate = ({ languages, onLoginClick, onChangeLanguage }) => {
	const { t } = useTranslation()

	return (
		<div>
			<Typography variant='h2'>{t('title', { ns: 'landing' })}</Typography>
			{languages.map((lang) => {
				return (
					<Button key={lang.code} onClick={() => onChangeLanguage(lang)}>
						{lang.name}
					</Button>
				)
			})}
			<hr />
			<Button onClick={onLoginClick}>{t('login', { ns: 'landing' })}</Button>
		</div>
	)
}
export default LandingTemplate
```

-   Modify the home `layout.jsx` file

```jsx
// src\features\home\layout\layout.jsx
import React, { useEffect, useState } from 'react'
import i18next from 'i18next'
import DesktopTemplate from './layout.template'

const Layout = () => {
	const [namespaceLoaded, setNamespaceLoaded] = useState(false)

	useEffect(() => {
		i18next
			.loadNamespaces('home', (err) => {
				if (err) console.error('Error loading `home` namespace', err)
			})
			.then(() => setNamespaceLoaded(true))
	}, [])

	if (!namespaceLoaded) return <span>Loading dictionary</span>

	return <DesktopTemplate />
}
export default Layout
```

-   Modify the home `home.template.jsx` file

```jsx
// src\features\home\index\home.template.jsx
import React from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const HomeTemplate = ({ title, onchangeTitle, onLogoutClick }) => {
	const { t } = useTranslation()
	return (
		<div>
			<Typography variant='h2'>{t('title', { ns: 'home' })}</Typography>
			<Typography variant='h5'>{title}</Typography>
			<TextField onChange={onchangeTitle} />
			<Button onClick={onLogoutClick}>{t('logout', { ns: 'home' })}</Button>
		</div>
	)
}

export default HomeTemplate
```

## Material UI

-   Install material ui with `npm install @mui/material @emotion/react @emotion/styled`
-   Install material ui icons with `npm install @mui/icons-material`
-   Install the Roboto font with `npm install @fontsource/roboto`
-   Create `index.css` file

```css
body {
	margin: 0;
	font-family: 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
		'Helvetica Neue', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
```

-   Create `roboto-font.js` file

```js
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '../index.css'
```

-   Import Roboto fon in `main.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import RootView from './root-view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './features/landing/landing'
import CallbackPage from './auth/callback-page'

import './assets/roboto-font'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RootView>
			<BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
				<Routes>
					<Route path='/*' element={<App />} />
					<Route path='callback' element={<CallbackPage />} />
					<Route path='landing' element={<Landing />} />
				</Routes>
			</BrowserRouter>
		</RootView>
	</React.StrictMode>
)
```

### Add theme provider

-   Create file `default.theme.js`

```javascript
import { createTheme } from '@mui/material/styles'

const defaultTheme = {
	palette: {},
	typography: {
		fontFamily: 'Roboto',
	},
}

export default createTheme(defaultTheme)
```

-   Modify the file `root-view.jsx`

```jsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { ThemeProvider } from '@mui/material/styles'
import defaultTheme from './assets/themes/default.theme'

import { OidcProvider, loadUser } from 'redux-oidc'
import userManager from './auth/user-manager'

loadUser(store, userManager)

const RootView = (props) => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<OidcProvider store={store} userManager={userManager}>
				<Provider store={store}>{props.children}</Provider>
			</OidcProvider>
		</ThemeProvider>
	)
}
export default RootView
```
