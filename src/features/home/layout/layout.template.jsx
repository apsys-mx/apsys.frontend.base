import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Layout template
 */
const LayoutTemplate = () => {
	return (
		<div>
			<Outlet />
		</div>
	)
}
export default LayoutTemplate
