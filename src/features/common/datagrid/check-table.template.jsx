import React from 'react'
import propTypes from 'prop-types'
import { Box, Checkbox } from '@mui/material'

const CheckTableTemplate = ({ isCheck, checkValueName, checkValueChange, isIndeterminate }) => {
	return (
		<Box>
			<Checkbox
				color='primary'
				size='small'
				checked={isCheck}
				indeterminate={isIndeterminate}
				name={checkValueName}
				onChange={(event) => checkValueChange(event)}
			/>
		</Box>
	)
}
CheckTableTemplate.propTypes = {
	isCheck: propTypes.bool.isRequired,
	checkValueName: propTypes.string.isRequired,
	checkValueChange: propTypes.func,
	isIndeterminate: propTypes.bool,
}
CheckTableTemplate.defaultProps = {
	isCheck: false,
	checkValueName: '',
	checkValueChange: () => console.warn('No [checkValueChange] CallBack defined'),
	isIndeterminate: false,
}
export default CheckTableTemplate
