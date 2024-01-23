import React from 'react'
import { useGetHelloWorldQuery } from '../home.endPoints'
import DesktopTemplate from './home.template'
import ErrorViewQuery from '../../common/errorInfo/errorViewQuery'

/**
 * Home component
 */
const Home = () => {
	const {
		data: helloWorldResponse,
		isLoading,
		isError,
		error,
	} = useGetHelloWorldQuery()

	if (isLoading) return <div>Loading...</div>
	
	if (isError) {
		return <ErrorViewQuery error={error} />
	}
	return (
		<DesktopTemplate
			data={helloWorldResponse}
		/>
	)
}

export default Home
