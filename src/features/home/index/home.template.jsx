import React from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

/**
 * Home component
 */
const HomeTemplate = ({ title, onchangeTitle, onLogoutClick }) => {
	const { t } = useTranslation()
	return (
		<div>
			<Typography variant='h2'>{t('title', { ns: 'home' })}</Typography>
			<Typography variant='h5'>{title}</Typography>
			<TextField onChange={onchangeTitle} />
			<Button onClick={onLogoutClick}>{t('logout', { ns: 'home' })}</Button>
		</div>
	)
}

export default HomeTemplate
