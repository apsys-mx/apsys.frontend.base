import React from 'react'
import { Button, TextField, Typography } from '@mui/material'

/**
 * Home component
 */
const HomeTemplate = ({ title, onchangeTitle, onLogoutClick }) => {
	return (
		<div>
			<Typography variant='h2'>Home page</Typography>
			<Typography variant='h5'>{title}</Typography>
			<TextField onChange={onchangeTitle} />
			<Button onClick={onLogoutClick}>Logout</Button>
		</div>
	)
}

export default HomeTemplate
