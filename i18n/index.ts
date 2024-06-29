import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import sk from './sk.json';

const resources = {
	en: {
		translation: en,
	},
	sk: {
		translation: sk,
	},
} as const;

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources,
	fallbackLng: 'sk',
	lng: 'sk',
});
export default i18n;
