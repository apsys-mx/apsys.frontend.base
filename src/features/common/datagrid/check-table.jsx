import React from 'react'
// import { useSelector, useDispatch } from "react-redux";
import CheckTableTemplate from './check-table.template'

const CheckTable = ({ isCheck, checkValueName, isIndeterminate }) => {
	const onChangeCheck = (event) => {
        var purchaseRequestDetail = []
		console.log('change check', event)
	}
	return (
		<CheckTableTemplate
			isCheck={isCheck}
			checkValueName={checkValueName}
			checkValueChange={(event) => onChangeCheck(event)}
			isIndeterminate={isIndeterminate}
		/>
	)
}
export default CheckTable
