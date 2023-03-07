import React from 'react'
import { Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

/**
 * Landing page
 */
const LandingTemplate = ({ languages, onLoginClick, onChangeLanguage }) => {
	const { t } = useTranslation()

	return (
		<div>
			<Typography variant='h2'>{t('title', { ns: 'landing' })}</Typography>
			<Typography>Mobile view</Typography>
			{languages.map((lang) => {
				return (
					<Button key={lang.code} onClick={() => onChangeLanguage(lang)}>
						{lang.name}
					</Button>
				)
			})}
			<hr />
			<Button onClick={onLoginClick}>{t('login', { ns: 'landing' })}</Button>
		</div>
	)
}
export default LandingTemplate
