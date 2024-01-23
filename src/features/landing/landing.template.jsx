import React from 'react'
import propTypes from 'prop-types'
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
			<Typography>Desktop view</Typography>
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
LandingTemplate.propTypes = {
	languages: propTypes.array,
	onLoginClick: propTypes.func,
	onChangeLanguage: propTypes.func,
}
export default LandingTemplate
