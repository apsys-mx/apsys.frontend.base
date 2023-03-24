import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, TextField, Typography } from '@mui/material'

/**
 * Home component
 */
const HomeTemplate = () => {
	const { t } = useTranslation()
	return (
		<Box>
			<Typography variant='h6'>TablaComponet</Typography>
		</Box>
	)
}

export default HomeTemplate
