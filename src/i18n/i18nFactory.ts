import * as i18next from 'i18next'
import { TFunction } from 'i18next'

import { Lang } from 'meta/lang'

import { arTranslation } from './resources/ar'
import { enTranslation } from './resources/en'
import { esTranslation } from './resources/es'
import { frTranslation } from './resources/fr'
import { ruTranslation } from './resources/ru'
import { zhTranslation } from './resources/zh'

// @ts-ignore
const createInstance = i18next.createInstance || i18next.default.createInstance

const translationsFiles: { [langCode: string]: any } = {
  en: enTranslation,
  es: esTranslation,
  fr: frTranslation,
  ru: ruTranslation,
  ar: arTranslation,
  zh: zhTranslation,
}

export const createParams = (lang: string) => ({
  fallbackLng: 'en',
  debug: false,

  // react i18next special options (optional)
  react: {
    wait: false, // set to true if you like to wait for loaded in every translated hoc
    nsMode: 'default', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
  },

  lng: lang,

  resources: {
    en: {
      translation: translationsFiles.en,
    },
    es: {
      translation: translationsFiles.es,
    },
    fr: {
      translation: translationsFiles.fr,
    },
    ru: {
      translation: translationsFiles.ru,
    },
    ar: {
      translation: translationsFiles.ar,
    },
    zh: {
      translation: translationsFiles.zh,
    },
  },
})

export const createI18nPromise = (lang: any): Promise<{ language: Lang; t: TFunction }> =>
  new Promise((resolve, reject) =>
    // @ts-ignore
    // eslint-disable-next-line no-promise-executor-return
    createInstance(createParams(lang), (err: any, t: any) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ language: lang, t })
    })
  )
