import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

/** Slices import section */
import homeSlice from '../features/home/home.slice'

/** oidc related import section */
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
	devTools: process.env.NODE_ENV !== 'production',
})
