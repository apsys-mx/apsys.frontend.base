import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
/**Import EndPoints */
import { useGetTimesheetsQuery } from '../home.endPoints'
/**Reducers */
import { setPageNumber, setPageSize } from '../home.slice'
/**Selectors */
import * as selectors from '../home.selectors'
/** Import templates */
import DesktopTemplate from './home.template'
/**
 * Home component
 */
const Home = () => {
	const dispatch = useDispatch()
	/**
	 * Selectors
	 */
	const viewPaginationState = useSelector((state) => selectors.getPagination(state))
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
	})
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::(Pagination)::::::::::::::::::::::://
	const handleChangePage = (pageNumber) => {
		dispatch(setPageNumber(pageNumber))
	}
	const handleChangeRowsPerPage = (pageSize) => {
		dispatch(setPageSize(pageSize))
	}
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	if (isLoading) return <div>Loading...</div>
	if (isError) {
		return <div>{JSON.stringify(error)}</div>
	}
	return (
		<DesktopTemplate
			response={timeSheetsResponse}
			onChangePage={handleChangePage}
			handleChangeRowsPerPage={handleChangeRowsPerPage}
		/>
	)
}

export default Home
