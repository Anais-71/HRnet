/**
 * i18n configuration for React application.
 * Sets up language resources and initializes i18n with React-i18next.
 *
 * @module i18n
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './i18n/en.json'
import frTranslations from './i18n/fr.json'

i18n
  .use(initReactI18next) // Adds React-i18next as an i18n plugin
  .init({
    /**
     * Language resources for translations.
     * @property {Object} resources - Language translation resources.
     * @property {Object} resources.en - English translations.
     * @property {Object} resources.fr - French translations.
     */
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
    },
    /**
     * Language detection using browser settings.
     * Extracts the primary language (e.g., 'en' or 'fr') from the user's browser settings.
     * @type {string}
     */
    lng: navigator.language.split('-')[0],
    /**
     * Fallback language if the user's language cannot be determined or is unavailable.
     * @type {string}
     */
    fallbackLng: 'en',
    interpolation: {
      /**
       * Disables escaping of translation values, as React already handles this.
       * @type {boolean}
       */
      escapeValue: false,
    },
  })

export default i18n
