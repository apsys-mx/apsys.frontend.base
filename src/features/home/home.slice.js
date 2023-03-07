import { createSlice } from '@reduxjs/toolkit'

const defaultToasterState = {
	open: false,
	message: '',
	severity: 'info',
}

const initialState = {
	title: 'Hello world',
	toaster: defaultToasterState,
}

export const homeSlice = createSlice({
	name: 'homeSlice',
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload
		},
		setToasterState: (state, action) => {
			state.toaster = action.payload
		},
	},
})

export const { setTitle, setToasterState } = homeSlice.actions
export default homeSlice.reducer
