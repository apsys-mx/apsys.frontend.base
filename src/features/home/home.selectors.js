import { createSelector } from 'reselect'

const getState = (state) => (state = state.homeSlice)

const getTitle = createSelector(getState, (state) => {
	return state.title
})
const getViewState = createSelector(getState, (state) => {
	return state
})
const getPagination = createSelector(getViewState, (state) => {
	return state.pagination
})
export { getTitle, getPagination }
