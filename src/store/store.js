import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import applicationSlice from '../features/application/application.slice'

const rootReducer = combineReducers({
	applicationSlice,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NODE_ENV !== 'production',
})
