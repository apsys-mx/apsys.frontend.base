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
