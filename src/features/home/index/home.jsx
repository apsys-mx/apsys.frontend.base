import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
/**Import EndPoints */
import { useGetTimesheetsQuery } from '../home.endPoints'
/**Reducers */
import { setPageNumber, setPageSize, setSorting } from '../home.slice'
/**Selectors */
import * as selectors from '../home.selectors'
/** Import templates */
import DesktopTemplate from './home.template'
import ErrorViewQuery from '../../common/errorInfo/errorViewQuery'
/**
 * Home component
 */
const Home = () => {
	const dispatch = useDispatch()
	/**
	 * Selectors
	 */
	const viewPaginationState = useSelector((state) => selectors.getPagination(state))
	const viewSortingState = useSelector((state) => selectors.getSorting(state))
	const viewFilter = useSelector((state) => selectors.getFilters(state))
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::(API´s):::::::::::::::::::::::::::://
	const {
		data: timeSheetsResponse,
		isLoading,
		isError,
		error,
	} = useGetTimesheetsQuery({
		pagination: {
			pageNumber: viewPaginationState.page,
			pageSize: viewPaginationState.rowsPerPage,
		},
		sorting: {
			sortBy: viewSortingState.sortBy,
			sortDirection: viewSortingState.sortDirection,
		},
		filters: viewFilter ? viewFilter : '',
	})
	console.log('viewFilter', viewFilter)
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::(Pagination)::::::::::::::::::::::://
	const handleChangePage = (pageNumber) => {
		dispatch(setPageNumber(pageNumber))
	}
	const handleChangeRowsPerPage = (pageSize) => {
		dispatch(setPageSize(pageSize))
	}
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::(Sorting):::::::::::::::::::::::::://
	const onchangeSorting = (sort, direction) => {
		dispatch(setSorting({ sortBy: sort, sortDirection: direction }))
	}
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	if (isLoading) return <div>Loading...</div>
	if (isError) {
		return <ErrorViewQuery error={error} />
	}
	return (
		<DesktopTemplate
			response={timeSheetsResponse}
			onChangePage={handleChangePage}
			handleChangeRowsPerPage={handleChangeRowsPerPage}
			onchangeSorting={onchangeSorting}
			sorting={viewSortingState}
		/>
	)
}

export default Home
