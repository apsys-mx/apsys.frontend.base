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
	sorting: {
		sortBy: '',
		sortDirection: '',
	},
	filters: '',
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
		setSorting: (state, action) => {
			state.sorting.sortBy = action.payload.sortBy
			state.sorting.sortDirection = action.payload.sortDirection
		},
		setFilter: (state, action) => {
			state.filters = action.payload
		},
	},
})

export const { setTitle, setToasterState, setPageNumber, setPageSize, setSorting, setFilter } =
	homeSlice.actions
export default homeSlice.reducer
