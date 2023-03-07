import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, TextField, Typography } from '@mui/material'

/**
 * Home component
 */
const HomeTemplate = ({ title, onchangeTitle, onShowToaster }) => {
	const { t } = useTranslation()

	return (
		<Box>
			<Typography variant='h3'>{t('title', { ns: 'home' })}</Typography>
			<Typography variant='h5'>{title}</Typography>
			<TextField onChange={onchangeTitle} />
			<Button onClick={onShowToaster}>Show toaster</Button>
		</Box>
	)
}

export default HomeTemplate
