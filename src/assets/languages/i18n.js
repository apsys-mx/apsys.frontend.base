import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(Backend)
	.init({
		ns: [],
		lang: 'en',
		fallbackLng: 'es',
		debug: import.meta.env.DEV,
	})

export const languages = [
	{
		code: 'en',
		name: 'English',
	},
	{
		code: 'es',
		name: 'Español',
	},
]
