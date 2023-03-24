import { createSlice } from '@reduxjs/toolkit'

const defaultToasterState = {
	open: false,
	message: '',
	severity: 'info',
}

const initialState = {
	title: 'Hello world',
	toaster: defaultToasterState,
	pagination: {
		rowsCount: 0,
		rowsPerPage: 20,
		page: 0,
	},
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
		setPageNumber: (state, action) => {
			state.pagination.page = action.payload
		},
		setPageSize: (state, action) => {
			state.pagination.rowsPerPage = action.payload
		},
	},
})

export const { setTitle, setToasterState, setPageNumber, setPageSize } = homeSlice.actions
export default homeSlice.reducer
