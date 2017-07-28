import i18next from 'i18next'

import { translation as enTranslation } from './resources/en'

export const createI18nInstance = (lang) =>
  i18next
    .init({
      fallbackLng: 'en',
      debug: false,

      // react i18next special options (optional)
      react: {
        wait: false, // set to true if you like to wait for loaded in every translated hoc
        nsMode: 'default' // set it to fallback to let passed namespaces to translated hoc act as fallbacks
      },
      lng: lang,
      resources: {
        en: {
          translation: enTranslation
        }
      }
    })
