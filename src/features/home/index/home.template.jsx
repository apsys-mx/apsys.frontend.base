import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box, TextField, Typography } from '@mui/material'

/**
 * Home component
 */
const HomeTemplate = ({ profile, title, onchangeTitle }) => {
	const { t } = useTranslation()

	return (
		<Box>
			<Typography variant='h3'>{t('title', { ns: 'home' })}</Typography>
			<Typography variant='h5'>{title}</Typography>
			<TextField onChange={onchangeTitle} />
		</Box>
	)
}

export default HomeTemplate
