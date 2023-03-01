import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Hello world',
}

export const applicationSlice = createSlice({
	name: 'applicationSlice',
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload
		},
	},
})

export const { setTitle } = applicationSlice.actions
export default applicationSlice.reducer
