import React from 'react'
import propTypes from 'prop-types'
import { Box } from '@mui/material'

/**
 * Home component
 */
const HomeTemplate = ({data}) => {
	return (
		<Box>
			<Box>
				{data}
			</Box>			
		</Box>
	)
}
HomeTemplate.propTypes = {
	data : propTypes.any
}
export default HomeTemplate
