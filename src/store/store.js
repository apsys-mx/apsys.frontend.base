import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

/** Slices import section */
import homeSlice from '../features/home/home.slice'

/** oidc related import section */
import { reducer as oidcReducer } from 'redux-oidc'
import createOidcMiddleware from 'redux-oidc'
import userManager from '../auth/user-manager'
import { timesheetsApi } from './timesheet-api'

const oidcMiddleware = createOidcMiddleware(userManager)

const rootReducer = combineReducers({
	oidc: oidcReducer,
	homeSlice: homeSlice,
	[timesheetsApi.reducerPath]: timesheetsApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			oidcMiddleware,
			timesheetsApi.middleware
		),
	devTools: import.meta.env.DEV,
})
