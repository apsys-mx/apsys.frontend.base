import React from 'react'
import { Button, Typography } from '@mui/material'

/**
 * Landing page
 */
const LandingTemplate = ({ onLoginClick }) => {
	return (
		<div>
			<Typography variant='h2'>Landing page template</Typography>
			<Button onClick={onLoginClick}>Login</Button>
		</div>
	)
}
export default LandingTemplate
