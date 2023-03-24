import React from 'react'
import { useDispatch } from 'react-redux'
/**Import EndPoints */
import { useGetTimesheetsQuery } from '../home.endPoints'
import { setPageNumber, setPageSize } from '../home.slice'

/** Import templates */
import DesktopTemplate from './home.template'

/**
 * Home component
 */
const Home = () => {
	const dispatch = useDispatch()
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::(API´s):::::::::::::::::::::::::::://
	const { data: timeSheetsResponse, isLoading, isError, error } = useGetTimesheetsQuery()
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
