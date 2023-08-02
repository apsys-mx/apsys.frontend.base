import { createSelector } from 'reselect'

const getAppState = (state) => state.homeSlice

/**
 * Get the toaster options
 */
const getToasterOptions = createSelector(getAppState, (state) => {
	return state.toaster
})

export { getToasterOptions }
