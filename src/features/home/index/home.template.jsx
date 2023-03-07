import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, TextField, Typography } from '@mui/material'

/**
 * Home component
 */
const HomeTemplate = ({ profile, title, onchangeTitle, onLogoutClick }) => {
	const { t } = useTranslation()

	return (
		<Box>
			<Typography variant='h2'>{t('title', { ns: 'home' })}</Typography>
			<Typography variant='h5'>{title}</Typography>
			<TextField onChange={onchangeTitle} />
			<Button onClick={onLogoutClick}>{t('logout', { ns: 'home' })}</Button>
		</Box>
	)
}

export default HomeTemplate
