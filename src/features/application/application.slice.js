import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Hello world',
}

export const applicationSlice = createSlice({
	name: 'applicationSlice',
	initialState,
	reducers: {},
})

export default applicationSlice.reducer
