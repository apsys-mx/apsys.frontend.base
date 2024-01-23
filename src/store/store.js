import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

/** Slices import section */
import homeSlice from '../features/home/home.slice'

/** oidc related import section */
import createOidcMiddleware, { reducer as oidcReducer } from 'redux-oidc'
import userManager from '../auth/user-manager'
import { backendApi } from './backend-api'

const oidcMiddleware = createOidcMiddleware(userManager)

const rootReducer = combineReducers({
	oidc: oidcReducer,
	homeSlice: homeSlice,
	[backendApi.reducerPath]: backendApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			oidcMiddleware,
			backendApi.middleware
		),
	devTools: import.meta.env.DEV,
})
