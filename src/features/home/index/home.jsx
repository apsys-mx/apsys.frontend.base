import React from 'react'
import { useGetTimesheetsQuery } from '../home.endPoints'

/** Import templates */
import DesktopTemplate from './home.template'

/**
 * Home component
 */
const Home = () => {
	const { data: timeSheetsResponse, isLoading, isError, error } = useGetTimesheetsQuery()
	if (isLoading) return <div>Loading...</div>
	if (isError) {
		return <div>{JSON.stringify(error)}</div>
	}
	console.log('timeSheetsResponse:', timeSheetsResponse)
	return <DesktopTemplate />
}

export default Home
