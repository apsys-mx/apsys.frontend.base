import { createSelector } from 'reselect'

const getState = (state) => (state = state.homeSlice)

const getTitle = createSelector(getState, (state) => {
	return state.title
})

export { getTitle }
