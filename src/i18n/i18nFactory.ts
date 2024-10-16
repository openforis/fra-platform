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

const translationsFiles = {
  [Lang.en]: enTranslation,
  [Lang.es]: esTranslation,
  [Lang.fr]: frTranslation,
  [Lang.ru]: ruTranslation,
  [Lang.ar]: arTranslation,
  [Lang.zh]: zhTranslation,
}

export const createParams = (lang: Lang) => ({
  fallbackLng: Lang.en,
  debug: false,

  // react i18next special options (optional)
  react: {
    wait: false, // set to true if you like to wait for loaded in every translated hoc
    nsMode: 'default' as 'default' | 'fallback', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
  },

  lng: lang,

  resources: {
    [Lang.en]: {
      translation: translationsFiles[Lang.en],
    },
    [Lang.es]: {
      translation: translationsFiles[Lang.es],
    },
    [Lang.fr]: {
      translation: translationsFiles[Lang.fr],
    },
    [Lang.ru]: {
      translation: translationsFiles[Lang.ru],
    },
    [Lang.ar]: {
      translation: translationsFiles[Lang.ar],
    },
    [Lang.zh]: {
      translation: translationsFiles[Lang.zh],
    },
  },
})

export const createI18nPromise = (lang: Lang): Promise<{ language: Lang; t: TFunction }> =>
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
