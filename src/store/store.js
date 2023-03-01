import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import homeSlice from '../features/home/home.slice'

const rootReducer = combineReducers({
	homeSlice: homeSlice,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NODE_ENV !== 'production',
})
